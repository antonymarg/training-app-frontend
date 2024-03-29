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
  arrayUnion,
} from '@firebase/firestore';
import { db } from '../firebase';
import { ITraining, ITrainingOnCreate } from './trainingModule.types';
import { IUserRole } from '../../Models/User/types';
import { eFeedbackFormStatus, eTrainingConfirmStatus } from '../../lib/enums';
import { userModule } from '../userModule';
import moment from 'moment';
import { assetsModule } from '../assetsModule';

interface ITrainingSearchCriteria {
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus;
}

const _sortTrainings = (trainings: ITraining[]) => {
  return trainings.sort((a, b) =>
    a.startDate.seconds > b.startDate.seconds ? -1 : 1
  );
};

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
        moment.unix(training.startDate.seconds).isAfter(moment())) ||
      (criteria.timePeriod === 'presentAndFuture' &&
        moment.unix(training.startDate.seconds).isBefore(moment()))
    )
      return;
    trainings.push({ id: tr.id, ...training } as ITraining);
  });
  return _sortTrainings(trainings);
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

const updateFeedbackField = async (
  trainingId: string,
  value: eFeedbackFormStatus
) => {
  const ref = doc(db, 'trainings', trainingId);
  return await updateDoc(ref, {
    feedbackFormStatus: value,
  });
};

const updateTraining = async (
  trainingId: string,
  training: ITrainingOnCreate
) => {
  const ref = doc(db, 'trainings', trainingId);
  return await updateDoc(ref, { ...training });
};

const uploadFollowUpMaterial = async (
  trainingId: string,
  material: { file: File; title: string; description?: string }
) => {
  const upload = await assetsModule.uploadAsset(
    `trainings/${trainingId}/followUpMaterial`,
    material.file
  );
  const ref = doc(db, 'trainings', trainingId);
  return updateDoc(ref, {
    followUpMaterials: arrayUnion({
      title: material.title,
      fileUrl: upload.metadata.fullPath,
      description: material.description,
    }),
  });
};

export const trainingModule = {
  createTraining,
  updateTraining,
  getTrainings,
  getTrainingById,
  updateUserStatus,
  updateFeedbackField,
  uploadFollowUpMaterial,
};
