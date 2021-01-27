import { User } from '../models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, isLoading: true, error: null };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        isLoading: false,
      };
    case AuthActions.AUTHENTICATE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case AuthActions.LOGOUT:
      return { ...state, user: null };
    case AuthActions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
