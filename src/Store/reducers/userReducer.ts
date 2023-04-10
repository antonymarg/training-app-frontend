import { LOGIN_SUCCESS, STORE_USER_DATA, LOGOUT } from "../actions/userActions";
import { UserAction } from "../actions/userActions.type";
import { UserState } from "../store.types";

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case STORE_USER_DATA:
      return {
        ...state,
        role: action.payload.role,
        profile: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    case LOGOUT:
      return {
        ...state,
        role: null,
        profile: undefined,
        isLoggedIn: false,
      };
  }
};

export default userReducer;
