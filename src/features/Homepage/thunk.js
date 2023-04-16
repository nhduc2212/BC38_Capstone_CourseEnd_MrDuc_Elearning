import { courseServ } from "./Services/courseService";
export const fetchCourse=async (dispatch)=>{
try{const res = await courseServ.fetchCourseData()
dispatch({
    type:"GET_COURSE_DATA",
    payload: res.data
})
}catch(err){
    
}};

export const fetchCourseType = async (dispatch) => {
    try{const res = await courseServ.fetchCourseType()
    dispatch({
        type:"GET_COURSE_TYPE",
        payload:res.data    })}catch(err){}
    }

export const fetchCourseListDetails=(listId)=> async (dispatch)=>{
    try{const res = await courseServ.fetchCourseListDetails(listId)
        dispatch({
            type:"GET_COURSE_LIST_DETAILS",
            payload:res.data})}catch(err){}
        }

export const fetchCourseDetails = (courseId) => async (dispatch) => {
    try {const res = await courseServ.fetchCourseDetails(courseId)
   dispatch({
    type:"GET_COURSE_DETAILS",
    payload:res.data
   })
    }catch(err){}
}
