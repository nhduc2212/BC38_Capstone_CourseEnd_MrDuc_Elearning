import { produce } from "immer";
const initialState = {
  courseData: [],
  courseTypes: [],
  courseListDetails:[],
  courseDetails:{},
};

const courseReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "GET_COURSE_DATA":
        draft.courseData = action.payload;
        break;
        case "GET_COURSE_TYPE":
        draft.courseTypes = action.payload;    
        break;
        case "GET_COURSE_LIST_DETAILS":
          draft.courseListDetails= action.payload;
          break;
          case "GET_COURSE_DETAILS":
            draft.courseDetails=action.payload;
      default:
        break;
    }
  });
};

export default courseReducer;
