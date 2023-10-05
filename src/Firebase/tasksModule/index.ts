import { realtimeDb } from '../firebase';
import { get, push, query, ref, set, update } from 'firebase/database';
import { ITask, ITaskOnCreate } from './tasksModule.types';
import { Timestamp } from 'firebase/firestore';
import { IUserRole } from '../../Models/User/types';

const tasksRef = (trainingId: string) => ref(realtimeDb, 'tasks/' + trainingId);
const userTaskStatusRef = (userId: string, trainingId: string) =>
  ref(realtimeDb, `userTasks/${userId}/${trainingId}`);

const createTask = async (
  trainingId: string,
  creatorId: string,
  task: ITaskOnCreate,
  participants: string[]
) => {
  const newTaskRef = push(tasksRef(trainingId));
  if (newTaskRef.key === null) return;
  await set(newTaskRef, {
    id: newTaskRef.key,
    ...task,
    createdBy: creatorId,
    createdAt: Timestamp.now(),
  });

  for (let pax of participants) {
    await update(userTaskStatusRef(pax, trainingId), {
      [newTaskRef.key]: 'pending',
    });
  }
};

const getTasksForTraining = async (
  trainingId: string,
  userId: string,
  userRole: IUserRole
) => {
  const tasksReq = await get(query(tasksRef(trainingId)));
  const tasksData = tasksReq.val();
  if (!tasksData) return [];
  let tasksArray = Object.keys(tasksData).map((key) => ({
    id: key,
    ...tasksData[key],
  }));
  if (userRole === 'participant') {
    const taskStatusReq = await get(
      query(userTaskStatusRef(userId, trainingId))
    );
    const taskStatusData = taskStatusReq.val();

    if (taskStatusData)
      tasksArray = tasksArray.map((task) => ({
        ...task,
        status: taskStatusData[task.id],
      }));
  }
  return tasksArray;
};

const getTaskFromId = async (taskId: string, trainingId: string) => {
  const taskReq = await get(
    query(ref(realtimeDb, `tasks/${trainingId}/${taskId}`))
  );
  const taskData = taskReq.val();
  return taskData;
};

const markTaskAsCompleted = async (
  taskId: string,
  userId: string,
  trainingId: string,
  userName: string
) => {
  await update(userTaskStatusRef(userId, trainingId), {
    [taskId]: 'completed',
  });
  let { completedBy } = await getTaskFromId(taskId, trainingId);
  if (!completedBy) completedBy = [];
  await update(ref(realtimeDb, `/tasks/${trainingId}/${taskId}`), {
    completedBy: [...completedBy, userName],
  });
};

const getUserTasks = async (userId: string) => {
  const taskStatusReq = await get(
    query(ref(realtimeDb, `userTasks/${userId}`))
  );
  const taskStatusData = taskStatusReq.val();
  if (!taskStatusData) return [];
  const tempTasks = Object.keys(taskStatusData).flatMap((key) => {
    return Object.keys(taskStatusData[key]).map((taskKey) => ({
      trainingId: key,
      taskId: taskKey,
      taskStatus: taskStatusData[key][taskKey],
    }));
  });
  const tasks: ITask[] = [];
  for (let i of tempTasks) {
    if (i.taskStatus === 'completed') continue;
    const task = await getTaskFromId(i.taskId, i.trainingId);
    if (task)
      tasks.push({ ...task, trainingId: i.trainingId, status: i.taskStatus });
  }
  return tasks.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
};

export const taskModule = {
  createTask,
  getTasksForTraining,
  markTaskAsCompleted,
  getUserTasks,
};
