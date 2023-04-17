import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/CourseSearch.scss'
import { useParams } from 'react-router-dom'
import { fetchCourse } from '../../../thunk'
import { Card } from 'antd'
import { scrollToTop } from '../../../../../Utils/ultiScript'


const CourseSearch = () => {
    const headerHeight = useSelector((state)=>state.ultiReducer.headerHeight)
    const footerHeight = useSelector((state)=>state.ultiReducer.footerHeight)
    const courseData = useSelector((state)=>state.courseReducer.courseData)
    const dispatch = useDispatch()
    const searchResult = [];
    const { Meta } = Card;
    const params = useParams();
    const {keyword} = params;
    const fetchSearchResult= ()=>{

    }
    useEffect(()=>{dispatch(fetchCourse); scrollToTop() },[])
  return (
    <section className='course-search'>
        <div className='course-search-outer-container' style={{paddingTop:headerHeight+"px",paddingBottom:footerHeight+"px", minHeight:"100vh"}}>
        <div className='course-search-inner-container flex flex-wrap justify-around'>
        {courseData?.map((item)=>(item.tenKhoaHoc.toLowerCase().includes(params.keyword.toLowerCase())?
              <div  className='homepage-card-container mb-9'><Card style={{
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
            <button className='mx-auto inline-block w-full'>Đăng ký</button></div>:""
              
            ))}
            </div>
        </div>
    </section>
  )
}

export default CourseSearch