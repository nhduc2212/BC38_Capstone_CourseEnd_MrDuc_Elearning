import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/AdminPage.scss";
import { Tabs, Pagination, Button, Modal } from "antd";
import UserManagement from "./Components/userManagement";
import {
  fetchCourseListData,
  fetchSecondaryUserList,
  fetchUserListData,
} from "./thunk";
import { adminServ } from "./Services/adminServ";

const AdminPage = () => {
  const headerHeight = useSelector((state) => state.ultiReducer.headerHeight);
  const footerHeight = useSelector((state) => state.ultiReducer.footerHeight);
  
  const courseData = useSelector((state) => state.adminReducer.courseList);
  
  const dispatch = useDispatch();
  const onChangeTab = (key) => {
    console.log(key);
  };
  useEffect(() => {
    dispatch(fetchCourseListData(1));
    dispatch(fetchSecondaryUserList);
  }, [dispatch]);

  // const handleAddNewUser = () => {};

  

  const items = [
    {
      key: "1", 
      label: `User Management`,
      children: <UserManagement/>,
    },
    {
      key: "2",
      label: `Course Management`,
      children: (
        <div className="course-management-table-container">
          <button className=" add-new-course-btn mb-12">Thêm Khoá học</button>
          <table className="w-full">
            <tr>
              <th>Stt</th>
              <th>Mã khoá học</th>
              <th>Hình ảnh</th>
              <th>Lượt xem</th>
              <th>Người tạo</th>
              <th>Thao tác</th>
            </tr>
            {courseData?.items?.map((course, index) => {
              return (
                <tr>
                  <td>{(courseData.currentPage - 1) * 12 + index + 1}</td>
                  <td>{course?.maKhoaHoc}</td>
                  <td>
                    <img width="5%" src={course?.hinhAnh} alt="" />
                    <p>{course?.hinhAnh}</p>
                  </td>
                  <td>{course?.luotXem}</td>
                  <td>{course?.nguoiTao.hoTen}</td>
                  <td>
                    <button>Ghi danh</button>
                    <button>Điều chỉnh</button> <button>Xoá</button>
                  </td>
                </tr>
              );
            })}
          </table>
          <Pagination
            className="mt-20 mb-20"
            pageSize={12}
            total={courseData?.totalCount}
            onChange={(page, pageSize) => {
              dispatch(fetchCourseListData(page));
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <section className="admin-page">
      <div
        className="admin-page-outer-container"
        style={{
          paddingTop: headerHeight + "px",
          paddingBottom: footerHeight + "px",
        }}
      >
        <div className="admin-page-inner-container">
          <Tabs
            centered
            defaultActiveKey="1"
            items={items}
            onChange={onChangeTab}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
