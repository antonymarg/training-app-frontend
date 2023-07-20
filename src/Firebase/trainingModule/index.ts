import {
  addDoc,
  getDocs,
  collection,
  where,
  limit,
  query,
} from '@firebase/firestore';
import { db } from '../firebase';
import { ITraining, ITrainingOnCreate } from './trainingModule.types';
import { IUserRole } from '../../Models/User/types';

const createTraining = async (training: ITrainingOnCreate) => {
  return await addDoc(collection(db, 'trainings'), training);
};

const getMyTrainings = async (userId: string, role: IUserRole) => {
  const trainings: ITraining[] = [];
  let searchQuery = query(
    collection(db, 'trainings'),
    where(`${role}s`, 'array-contains', userId),
    limit(10)
  );
  const queryResults = await getDocs(searchQuery);
  queryResults.forEach((tr) =>
    trainings.push({ id: tr.id, ...tr.data() } as ITraining)
  );
  return trainings;
};
export const trainingModule = { createTraining, getMyTrainings };
