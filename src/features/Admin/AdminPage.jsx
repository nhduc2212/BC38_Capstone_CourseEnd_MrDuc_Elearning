import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/AdminPage.scss";
import { Tabs, Pagination, Button, Modal } from "antd";
import UserManagement from "./Components/userManagement";
import {
  fetchSecondaryUserList,
  fetchUserListData,
} from "./thunk";
import { adminServ } from "./Services/adminServ";
import CourseManagement from "./Components/CourseManagement";

const AdminPage = () => {
  const headerHeight = useSelector((state) => state.ultiReducer.headerHeight);
  const footerHeight = useSelector((state) => state.ultiReducer.footerHeight);
  
  
  
  const dispatch = useDispatch();
  const onChangeTab = (key) => {
    console.log(key);
  };
  useEffect(() => {
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
      children: <CourseManagement/>,
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
