import React, { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Popover, Dropdown, Space } from "antd";
import "../styles/Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourseType } from "../features/Homepage/thunk";
import { userServ } from "../features/User/Services/userServ";
import { fetchLoggedInData, userLogin, userLogout } from "../features/User/thunk";

const Header = () => {
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseTypeData = useSelector(
    (state) => state.courseReducer.courseTypes
  );
  const loggedInUserData = useSelector(
    (state) => state.userReducer.loggedInUserData
  );
  const [userLoginData, setUserLoginData] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleLoginInfoChange = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.title]: e.target.value });
    console.log(userLoginData);
  };
  const handleLogin = (userData) => {
    dispatch(userLogin(userData));
  };

  const handleLogout = ()=>{
    dispatch(userLogout)
    navigate("/")
  }

  const content = (
    <form onClick={(e) => e.preventDefault()}>
      <label htmlFor="" className="mt-4">
        {" "}
        Tên đăng nhập
      </label>
      <input
        onChange={handleLoginInfoChange}
        title="taiKhoan"
        id="login-account"
        type="text"
        className="block outline-double mt-2 w-44"
      />
      <label htmlFor="" className="mt-4">
        Mật khẩu
      </label>
      <input
        onChange={handleLoginInfoChange}
        title="matKhau"
        id="login-password"
        type="text"
        className="block outline-double mt-2 w-44"
      />
      <p id="login-result"></p>
      <button
        onClick={() => {
          handleLogin(userLoginData);
        }}
        className="mt-4"
      >
        Đăng nhập
      </button>
      <button className="mt-4 ml-2">Đăng ký</button>
    </form>
  );
  

  useEffect(() => {
    dispatch(fetchCourseType);
    
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  var topPos = window.pageYOffset;
  window.onscroll = () => {
    var scrolled = window.pageYOffset;
    if (topPos > scrolled) {
      document.getElementById("outer-header-container").style.top = "0";
      document.getElementById("outer-footer-container").style.bottom = "0";
      document.getElementById("scrollToTopBtn").style.top = "-250px";
    } else {
      document.getElementById("outer-header-container").style.top = "-250px";
      document.getElementById("outer-footer-container").style.bottom = "-250px";
      document.getElementById("scrollToTopBtn").style.top = "30px";
    }
    topPos = scrolled;
  };

  let getHeaderHeight = () => async (dispatch) => {
    dispatch({
      type: "GET_HEADER_HEIGHT",
      payload: ref.current.offsetHeight,
    });
  };
  const items = courseTypeData?.map((courseType) => {
    return {
      label: (
        <a
          onClick={() => {
            navigate("/courses/" + courseType.maDanhMuc);
          }}
        >
          {courseType.tenDanhMuc}
        </a>
      ),
      key: "0",
    };
  });

  useEffect(() => {
    dispatch(getHeaderHeight());
  }, []);

  return (
    <header ref={ref} className="fixed " id="outer-header-container">
      <div className="header-container mx-auto">
        {/* icons */}
        <div className="icon-container">
          <a
            className="cursor-pointer"
            onClick={() => {
              {
                navigate("/");
              }
            }}
          >
            <img
              src="https://cybersoft.edu.vn/wp-content/uploads/2017/04/MAX-OP1.png"
              alt="image not found"
            />
          </a>
        </div>

        {/* Danh sách khoá học */}
        <nav className="header-navigator">
          <Dropdown
            className="z-30 cursor-pointer"
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <i
                  class="fa-solid fa-bars fa-lg"
                  style={{ display: "inline" }}
                ></i>
                <p style={{ display: "inline" }}>Danh mục khoá học</p>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </nav>

        {/* Nội dung header */}
        <div className="header-body-container">
          <div className="header-search-function-container">
            <input
              id="course-search-input"
              type="text"
              defaultValue=""
              placeholder="Tìm khoá học"
            />
            <button
              onClick={() => {
                navigate(
                  "/course-search/" +
                    document.getElementById("course-search-input").value
                );
              }}
            >
              Tìm
            </button>
          </div>

          {/* Các nút chức năng của header (Xét trạng thái đăng nhập để hiện thị) */}
          <div className="header-function-buttons">
            {loggedInUserData.hoTen?(
              <p className="inline-block logged-in-username">
                Xin chào, <span>{loggedInUserData.hoTen}</span>
              </p>
            ) : (
              <Space wrap>
                <Popover content={content} title="" trigger="click">
                  <Button className="mr-7">Đăng nhập</Button>
                </Popover>
              </Space>
            )}

            {loggedInUserData.hoTen? (
              <p className="inline-block logged-in-email">
                {loggedInUserData.email}
              </p>
            ) : (
              <button
                onClick={() => {
                  navigate("/user-registration/");
                }}
                className="header-function-button header-registration-button"
              >
                Đăng ký
              </button>
            )}
            {loggedInUserData.hoTen? (
              <button className="inline-block" onClick={handleLogout}>Log Out</button>
            ) : (
              ""
            )}
            {loggedInUserData.maLoaiNguoiDung==="GV" ? (
              <button className="inline-block" onClick={()=>{navigate("/admin/")}}>Site quản lý</button>
            ) : loggedInUserData.maLoaiNguoiDung==="HV" ? (
              <button className="inline-block" onClick={()=>{navigate('/user-profile/')}} >Profile</button>
            ):""}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
