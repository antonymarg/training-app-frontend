import {
  addDoc,
  getDocs,
  collection,
  where,
  limit,
  query,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
  QueryFieldFilterConstraint,
} from '@firebase/firestore';
import { db } from '../firebase';
import { ITraining, ITrainingOnCreate } from './trainingModule.types';
import { IUserRole } from '../../Models/User/types';
import { eTrainingConfirmStatus } from '../../lib/enums';
import { userModule } from '../userModule';
import moment from 'moment';

interface ITrainingSearchCriteria {
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus;
}

const createTraining = async (training: ITrainingOnCreate) => {
  let trainingToFirebase = {
    ...training,
    createdAt: Timestamp.now(),
  };
  return await addDoc(collection(db, 'trainings'), trainingToFirebase);
};

const getTrainingById = async (trainingId: string, getFullFields = false) => {
  let trainingResp = await getDoc(doc(db, 'trainings', trainingId));
  const training = trainingResp.data() as ITraining;
  if (!getFullFields) return training;

  for (let trainerId of Object.keys(training.trainers)) {
    let trainerProfile = await userModule.getUserById(trainerId);
    if (trainerProfile.imgFirebasePath)
      trainerProfile.imgSrc = await userModule.getUserImage(
        trainerProfile.imgFirebasePath
      );
    training.trainers[trainerId] = {
      profile: trainerProfile,
      ...training.trainers[trainerId],
    };
  }
  for (let participantId of Object.keys(training.participants)) {
    let paxProfile = await userModule.getUserById(participantId);
    if (paxProfile.imgFirebasePath)
      paxProfile.imgSrc = await userModule.getUserImage(
        paxProfile.imgFirebasePath
      );
    training.participants[participantId] = {
      profile: paxProfile,
      ...training.participants[participantId],
    };
  }

  return training;
};

const getTrainings = async (
  userId: string,
  role: IUserRole,
  criteria: ITrainingSearchCriteria
) => {
  const trainings: ITraining[] = [];
  let whereList: QueryFieldFilterConstraint[] = [];

  if (criteria.trainingStatus) {
    whereList.push(
      where(`${role}s.${userId}`, '>=', { status: criteria.trainingStatus })
    );
  }

  let searchQuery = query(collection(db, 'trainings'), ...whereList, limit(10));
  const queryResults = await getDocs(searchQuery);
  queryResults.forEach((tr) => {
    let training = tr.data();
    if (
      (criteria.timePeriod === 'past' &&
        moment.unix(training.startDate).isAfter(moment())) ||
      (criteria.timePeriod === 'presentAndFuture' &&
        moment.unix(training.startDate).isBefore(moment()))
    )
      return;
    training.startDate = moment.unix(training.startDate.seconds).format();
    trainings.push({ id: tr.id, ...training } as ITraining);
  });
  return trainings;
};

const updateUserStatus = async (
  trainingId: string,
  userId: string,
  role: IUserRole,
  status: eTrainingConfirmStatus
) => {
  const ref = doc(db, 'trainings', trainingId);
  return await updateDoc(ref, {
    [`${role}s.${userId}`]: { status },
  });
};

export const trainingModule = {
  createTraining,
  getTrainings,
  getTrainingById,
  updateUserStatus,
};
