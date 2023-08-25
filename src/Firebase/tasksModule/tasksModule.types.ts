import { Timestamp } from 'firebase/firestore';

export interface ITaskOnCreate {
  title: string;
  description: string;
  deadline: Timestamp;
}

export interface ITask extends ITaskOnCreate {
  createdAt: Timestamp;
  createdBy: string;
}
