import { produce } from "immer";
const initialState = {
  userData: [],
  userUnsortedData:[],
  courseList: [],
  userDataFiltered:[]
};

const adminReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADMIN_FETCH_USER_DATA":
        draft.userData = action.payload;
        break;
      case "ADMIN_FETCH_COURSE_LIST":
        draft.courseList = action.payload;
        break;
        case "ADMIN_FETCH_UNSORTED_USER_DATA":
        draft.userUnsortedData = action.payload;
        break;
        case "ADMIN_SEARCHING":
          draft.userDataFiltered = action.payload;
        break;

      default:
        break;
    }
  });
};

export default adminReducer;
