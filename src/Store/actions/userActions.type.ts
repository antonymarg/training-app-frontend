import { Action } from "redux";
import { UserRole } from "../../lib/types";
import { LOGIN_SUCCESS, LOGOUT, STORE_USER_DATA } from "./userActions";

interface LoginSuccessAction extends Action {
  type: typeof LOGIN_SUCCESS;
  payload: {};
}

interface StoreUserDataAction extends Action {
  type: typeof STORE_USER_DATA;
  payload: {
    role: UserRole;
    email: string;
    name: string;
  };
}

interface LogoutAction extends Action {
  type: typeof LOGOUT;
  payload: {};
}

export type UserAction =
  | LoginSuccessAction
  | StoreUserDataAction
  | LogoutAction;
