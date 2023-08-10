import { IUserProfile } from '../../Models/User/types';
import { realtimeDb } from '../firebase';
import { get, query, ref, update } from 'firebase/database';
import { userModule } from '../userModule';

const needsAssessmentRef = (trainingId: string) =>
  ref(realtimeDb, 'needsAssesment/' + trainingId);

interface INAResponse {
  user: IUserProfile | string;
  response: {
    motivation: string;
    expectation: string;
  };
}
const sendNAForm = async (
  trainingId: string,
  userId: string,
  response: { motivation: string; expectation: string }
) => {
  await update(needsAssessmentRef(trainingId), { [userId]: response });
};

const getNAResponses = async (trainingId: string) => {
  const NAQuery = query(needsAssessmentRef(trainingId));

  const NAQueryResponses = await get(NAQuery);

  let NAResponses: INAResponse[] = [];
  NAQueryResponses.forEach((NAResp) => {
    NAResponses.push({
      user: NAResp.key as string,
      response: NAResp.val() as { expectation: string; motivation: string },
    });
  });
  for (let resp of NAResponses) {
    let user = await userModule.getUserById(resp.user as string);
    resp.user = user;
  }
  return NAResponses;
};

export const NAModule = {
  sendNAForm,
  getNAResponses,
};
