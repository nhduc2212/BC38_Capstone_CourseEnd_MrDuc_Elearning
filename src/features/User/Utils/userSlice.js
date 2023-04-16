import { produce } from "immer";
const initialState = {
  userData: [],
  loggedInUserData:[],
  loggedInUserProfileData:[],
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "GET_USER_LIST":
        draft.userData = action.payload;
        break;
        case "USER_LOGIN_LOGOUT":
          draft.loggedInUserData = action.payload;
          break;
          case "FETCH_LOGIN_DATA":
            draft.loggedInUserData = action.payload;
            break;
          case "FETCH_PROFILE":
          draft.loggedInUserProfileData = action.payload;
          break;

      default:
        break;
    }
  });
};

export default userReducer;
