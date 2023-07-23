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
  QueryFieldFilterConstraint,
} from '@firebase/firestore';
import { db } from '../firebase';
import {
  ITraining,
  ITrainingOnCreate,
  ITrainingUser,
} from './trainingModule.types';
import { IUserRole } from '../../Models/User/types';
import { eTrainingConfirmStatus } from '../../lib/enums';
import { userModule } from '../userModule';
import moment from 'moment';

const createTraining = async (training: ITrainingOnCreate) => {
  let trainingToFirebase = {
    ...training,
    createdAt: Timestamp.now(),
    startDate: Timestamp.fromDate(new Date(training.startDate)),
    endDate: Timestamp.fromDate(new Date(training.endDate)),
  };
  return await addDoc(collection(db, 'trainings'), trainingToFirebase);
};

interface ITrainingSearchCriteria {
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus[];
}

const getTrainingById = async (trainingId: string, getFullFields = false) => {
  let training = await getDoc(doc(db, 'trainings', trainingId));
  if (!getFullFields) return training.data() as ITraining;

  let trainers: ITrainingUser[] = [];
  let participants: ITrainingUser[] = [];

  for (let trainer of (training.data() as ITraining).trainers) {
    let trainerProfile = await userModule.getUserById(trainer.userId);
    if (trainerProfile.imgFirebasePath)
      trainerProfile.imgSrc = await userModule.getUserImage(
        trainerProfile.imgFirebasePath
      );
    trainers.push({ ...trainer, profile: trainerProfile });
  }

  for (let pax of (training.data() as ITraining).participants) {
    let paxProfile = await userModule.getUserById(pax.userId);
    if (paxProfile.imgFirebasePath)
      paxProfile.imgSrc = await userModule.getUserImage(
        paxProfile.imgFirebasePath
      );
    participants.push({ ...pax, profile: paxProfile });
  }

  return {
    ...training.data(),
    trainers,
    participants,
  } as ITraining;
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
      where(
        `${role}s`,
        'array-contains-any',
        criteria.trainingStatus.map((stat) => ({
          userId,
          status: stat,
        }))
      )
    );
  }

  if (criteria.timePeriod === 'past') {
    whereList.push(where(`startDate`, '<=', new Date()));
  }

  if (criteria.timePeriod === 'presentAndFuture') {
    whereList.push(where(`startDate`, '>=', new Date()));
  }

  let searchQuery = query(collection(db, 'trainings'), ...whereList, limit(10));
  const queryResults = await getDocs(searchQuery);
  queryResults.forEach((tr) => {
    let training = tr.data();
    training.startDate = moment(training.startDate.toDate()).format();
    trainings.push({ id: tr.id, ...training } as ITraining);
  });
  return trainings;
};
export const trainingModule = {
  createTraining,
  getTrainings,
  getTrainingById,
};
