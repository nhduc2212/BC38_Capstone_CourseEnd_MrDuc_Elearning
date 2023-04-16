import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../../thunk";
import "../styles/CourseDetail.scss";
import { scrollToTop } from "../../../../../Utils/ultiScript";
import { courseServ } from "../../../Services/courseService";

const CourseDetail = () => {
  const headerHeight = useSelector((state) => state.ultiReducer.headerHeight);
  const footerHeight = useSelector((state) => state.ultiReducer.footerHeight);
  const params = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.userReducer.loggedInUserData)

  const { courseId } = params;
  const courseDetailedData = useSelector(
    (state) => state.courseReducer.courseDetails
  );
  useEffect(() => {
    dispatch(fetchCourseDetails(params.courseId)); scrollToTop();
  }, [params]);
const renderRating = ()=>{

}
const handleEnrollConfirmation=(courseId,account)=>{
courseServ.courseRegistration(courseId,account)
window.location.reload()
}

  return (
    <section className="course-Details">
      <div
        className="course-details-outer-container"
        style={{
          paddingTop: headerHeight + "px",
          paddingBottom: footerHeight + "px",
          minHeight: `100vh`,
        }}
      >
        <div className="course-photo-container">
          <div
            className="course-photo-container-background"
            style={{ backgroundImage: `url(${courseDetailedData?.hinhAnh})` }}
          ></div>
          <img src={courseDetailedData?.hinhAnh} alt="" />
        </div>
        <div className="course-details-inner-container">
          <div className="course-details-details">
            <h1 className="course-title">{courseDetailedData?.tenKhoaHoc}</h1>
            <div className="course-rating-container">
              <p className="course-details-rating">Đánh giá khoá học: </p>
              <p >Luợt xem: <span className="text-red-500">{courseDetailedData.luotXem}</span></p>
            </div>
            {userData.hoTen?<button onClick={()=>{handleEnrollConfirmation(courseDetailedData?.maKhoaHoc,userData.taiKhoan)}} className="mx-auto justify-center w-fit block">Ghi danh</button>:<button disabled className="mx-auto cursor-not-allowed justify-center w-fit block">Xin vui lòng đăng nhập</button>}
            
            <div className="course-details-content">
              <h3>Giới thiệu khoá học</h3>
              <p>{courseDetailedData.moTa}</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
