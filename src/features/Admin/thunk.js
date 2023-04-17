import { adminServ } from "./Services/adminServ";

export const fetchUserListData = (page) => async (dispatch) => {
  try {
    const res = await adminServ.fetchUserList(12, page);
    dispatch({
      type: "ADMIN_FETCH_USER_DATA",
      payload: res.data,
    });
  } catch (err) {}
};

export const fetchCourseListData = (page) => async (dispatch) => {
  try {
    const res = await adminServ.fetchCourseList(12, page);
    dispatch({
      type: "ADMIN_FETCH_COURSE_LIST",
      payload: res.data,
    });
  } catch (err) {}
};

export const fetchSecondaryUserList = async (dispatch) => {
  try {
    const res = await adminServ.fetchSecondaryUserData()
    dispatch({
      type: "ADMIN_FETCH_UNSORTED_USER_DATA",
      payload: res.data,
    })
  } catch (err) {}
};

export const fetchSearchingUserList = (keyWord, page)=> async (dispatch)=>{
  try{
    const res = await adminServ.fetchFoundUserData(keyWord, 12, page)
    dispatch({
      type:"ADMIN_SEARCHING",
      payload:res.data,
    })
  }catch(err){}
}

export const fetchCourseCategoryList = async (dispatch) => {
  try {
    const res = await adminServ.fetchCourseCategoryList()
    dispatch({
      type:"ADMIN_FETCH_COURSE_CATEGORY",
      payload: res.data,
    })
  }catch(err){}
}