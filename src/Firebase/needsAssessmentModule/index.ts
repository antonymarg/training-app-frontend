import { realtimeDb } from '../firebase';
import { get, query, ref, update } from 'firebase/database';
import { userModule } from '../userModule';
import { INAFormResponse, INAResponse } from './needsAssementModule.types';

const needsAssessmentRef = (trainingId: string) =>
  ref(realtimeDb, 'needsAssessment/' + trainingId);

const sendNAForm = async (
  trainingId: string,
  userId: string,
  response: INAFormResponse
) => {
  await update(needsAssessmentRef(trainingId), { [userId]: response });
};

const getNAResponses = async (trainingId: string) => {
  const responses: { userID: string; response: INAFormResponse }[] = [];
  const NAResponses: INAResponse[] = [];

  const respFromQUery = await get(query(needsAssessmentRef(trainingId)));
  respFromQUery.forEach((NAResp) => {
    responses.push({
      userID: NAResp.key as string,
      response: NAResp.val() as { expectation: string; motivation: string },
    });
  });

  for (let resp of responses) {
    let user = await userModule.getUserById(resp.userID);
    NAResponses.push({
      user,
      response: resp.response,
    });
  }
  return NAResponses;
};

export const needsAssessmentModule = {
  sendNAForm,
  getNAResponses,
};
