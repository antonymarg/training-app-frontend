import { realtimeDb } from '../firebase';
import { get, query, ref, update } from 'firebase/database';
import { userModule } from '../userModule';
import { IFeedbackForm, IFeedbackFormResponse } from './feedbackModule.types';

const feedbackRef = (trainingId: string) =>
  ref(realtimeDb, 'feedback/' + trainingId);

const sendFeedbackForm = async (
  trainingId: string,
  userId: string,
  response: IFeedbackForm
) => {
  await update(feedbackRef(trainingId), { [userId]: response });
};

const getFeedbackResponses = async (trainingId: string) => {
  const responses: { userID: string; response: IFeedbackForm }[] = [];
  const feedbackFormResponses: IFeedbackFormResponse[] = [];

  const respFromQUery = await get(query(feedbackRef(trainingId)));
  respFromQUery.forEach((feedback) => {
    responses.push({
      userID: feedback.key as string,
      response: feedback.val(),
    });
  });

  for (let resp of responses) {
    let user = await userModule.getUserById(resp.userID);
    feedbackFormResponses.push({
      user,
      response: resp.response,
    });
  }
  return feedbackFormResponses;
};

const hasFilledFeedback = async (trainingId: string, userId: string) => {
  const responses: string[] = [];
  const respFromQUery = await get(query(feedbackRef(trainingId)));
  respFromQUery.forEach((feedback) => {
    responses.push(feedback.key ?? '');
  });

  return responses.some((e) => e === userId);
};

export const feedbackModule = {
  sendFeedbackForm,
  getFeedbackResponses,
  hasFilledFeedback,
};
