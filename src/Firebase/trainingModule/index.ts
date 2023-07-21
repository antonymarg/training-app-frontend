import {
  addDoc,
  getDocs,
  collection,
  where,
  limit,
  query,
  getDoc,
  doc,
  or,
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
const createTraining = async (training: ITrainingOnCreate) => {
  return await addDoc(collection(db, 'trainings'), training);
};

const getTrainingById = async (trainingId: string, getFullFields = false) => {
  let training = await getDoc(doc(db, 'trainings', trainingId));
  if (!getFullFields) return training.data() as ITraining;

  let trainers: ITrainingUser[] = [];
  let participants: ITrainingUser[] = [];

  for (let trainer of (training.data() as ITraining).trainers) {
    let trainerProfile = await userModule.getUserById(trainer.userId);
    trainers.push({ ...trainer, profile: trainerProfile });
  }

  for (let pax of (training.data() as ITraining).participants) {
    let paxProfile = await userModule.getUserById(pax.userId);
    participants.push({ ...pax, profile: paxProfile });
  }

  return {
    ...training.data(),
    trainers,
    participants,
  } as ITraining;
};
const getMyTrainings = async (userId: string, role: IUserRole) => {
  const trainings: ITraining[] = [];
  let searchQuery = query(
    collection(db, 'trainings'),
    or(
      where(`${role}s`, 'array-contains', {
        userId,
        status: eTrainingConfirmStatus.Pending,
      }),
      where(`${role}s`, 'array-contains', {
        userId,
        status: eTrainingConfirmStatus.Confirmed,
      }),
      where(`${role}s`, 'array-contains', {
        userId,
        status: eTrainingConfirmStatus.Accepted,
      })
    ),
    limit(10)
  );
  const queryResults = await getDocs(searchQuery);
  queryResults.forEach((tr) =>
    trainings.push({ id: tr.id, ...tr.data() } as ITraining)
  );
  return trainings;
};
export const trainingModule = {
  createTraining,
  getMyTrainings,
  getTrainingById,
};
