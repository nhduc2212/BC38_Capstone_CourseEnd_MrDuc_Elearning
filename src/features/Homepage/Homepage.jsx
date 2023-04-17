import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd';
import {fetchCourse, fetchCourseType} from './thunk.js'
import './Styles/Homepage.scss'
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../Utils/ultiScript.js';

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { Meta } = Card;
  const headerHeight = useSelector((state)=>state.ultiReducer.headerHeight);
  const footerHeight = useSelector((state)=> state.ultiReducer.footerHeight)
  // const [courseData,setCourseData] = useState([]);
  const courseData = useSelector((state)=> state.courseReducer.courseData)
  useEffect(()=>{dispatch(fetchCourse);dispatch(fetchCourseType);scrollToTop()},[dispatch])
  
  return (
    <div className='outer-homepage-container' style={{paddingTop:headerHeight+"px",paddingBottom:footerHeight+"px"}}>
      <div className='inner-homepage-container'>
        <div className='homepage-ad-photo-container'><img src="https://www.ueh.edu.vn/images/upload/editer/H%E1%BB%99i%20th%E1%BA%A3o%20Khoa%20h%E1%BB%8Dc%20Qu%E1%BB%91c%20t%E1%BA%BF%20Resilience%20by%20Technology%20and%20Design%202022%20(2).jpg" alt="" /></div>
        
        <div className='homepage-latest-course bg-slate-200 p-3'>
          <h3 className='text-center text-2xl mb-4'>CÁC KHOÁ HỌC MỚI NHẤT</h3>
          <div className='latest-course-list flex flex-wrap justify-between'>
            {courseData?.slice(0,8)?.map((course)=>(
              <div className='homepage-card-container mb-9'><Card style={{
                width: 100+"%",
              }} className='h-96 mb-1 overflow-y-scroll'
              
              hoverable
              
              cover={<img alt="Course Image" src={course.hinhAnh} />}
            >
              <Meta title={course.tenKhoaHoc} description={
                <div>
                  <p className='font-bold'>Loại khoá học: <span><h2 className='inline text-xl'>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2></span></p>
                  <p>{course.moTa}</p>
                </div>
                } />
            </Card>
            <button className='mx-auto inline-block w-full' onClick={()=>{navigate("/course/"+course.maKhoaHoc)}}>Chi tiết</button></div>
              
            ))}

            
          </div>
        </div>
        </div>
      
      </div>
  )
}

export default Homepage