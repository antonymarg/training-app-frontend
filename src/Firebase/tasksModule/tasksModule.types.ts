import { Timestamp } from 'firebase/firestore';

export interface ITaskOnCreate {
  title: string;
  description: string;
  deadline: Timestamp;
}
const taskStatus = {
  pening: 'pending',
  completed: 'completed',
} as const;

export type ITaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface ITask extends ITaskOnCreate {
  id: string;
  createdAt: Timestamp;
  createdBy: string;
  status?: ITaskStatus;
  trainingId: string;
}
