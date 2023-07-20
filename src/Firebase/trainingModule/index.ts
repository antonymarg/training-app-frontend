import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firebase';
import { ITraining } from './trainingModule.types';

const createTraining = async (training: ITraining) => {
  return await addDoc(collection(db, 'trainings'), training);
};

export const trainingModule = { createTraining };
