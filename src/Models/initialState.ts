import { IRootState } from './types';
import { initialState as userState } from './User/initialState';

export const initialState: IRootState = {
  user: userState,
};
