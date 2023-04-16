import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseListDetails } from "../../../thunk";
import { Card} from "antd";
import '../styles/CourseList.scss'
import { fetchCourseType } from "../../../thunk";
import { scrollToTop } from "../../../../../Utils/ultiScript";

const CourseList = () => {
    const headerHeight = useSelector((state)=>state.ultiReducer.headerHeight)
    const footerHeight = useSelector((state)=>state.ultiReducer.footerHeight)
    const courseListDetailsData = useSelector((state)=>state.courseReducer.courseListDetails)
    const navigate = useNavigate();
  
    const params = useParams();
  const dispatch = useDispatch();
  const { Meta } = Card;
  useEffect(()=>{dispatch(fetchCourseListDetails(params.listId));dispatch(fetchCourseType);scrollToTop()}, [params, dispatch]);
  return <section className="course-list-details" >
    <div className="course-list-details-outer-container" style={{paddingTop:headerHeight+"px",paddingBottom:footerHeight+"px", minHeight:`100vh`}}>
        <div className="course-list-details-inner-container ">
<div className="course-details-container flex flex-wrap justify-around">
{courseListDetailsData?.map((item)=>(
              <div style={{
                width: 21+"%",
              }} className='homepage-card-container mb-9'><Card style={{
                width: 100+"%",
              }} className='h-96 mb-1 overflow-y-scroll'
              
              hoverable
              
              cover={<img alt="Course Image" src={item.hinhAnh} />}
            >
              <Meta title={item.tenKhoaHoc} description={
                <div>
                  <p className='font-bold'>Lượt xem: <span><h2 className='inline text-xl text-red-500 text-xs '>{item.luotXem}</h2></span></p>
                  <p>{item.moTa}</p>
                </div>
                } />
            </Card>
            <button className='mx-auto inline-block w-full' onClick={()=>{navigate('/course/'+item.maKhoaHoc)}}>Chi tiết</button></div>
              
            ))}

{/* {courseDetailsData.map((item)=>{

})} */}
</div>

            
        </div>
    

    </div>
    
    
   </section>;
};

export default CourseList;
