import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/UserProfile.scss";
import { fetchLoggedInUserProfile, updateProfile } from "./thunk";
import { Card } from "antd";
import { userServ } from "./Services/userServ";

const UserProfile = () => {
  const headerHeight = useSelector((state) => state.ultiReducer.headerHeight);
  const footerHeight = useSelector((state) => state.ultiReducer.footerHeight);
  const profileData = useSelector(
    (state) => state.userReducer.loggedInUserProfileData
  );
  const { Meta } = Card;
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);
  const [editableProfileData, setEditableProfileData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
    email: "",
  });
  const updateToggle = () => {
    if (isInUpdateMode === false) {
      setIsInUpdateMode(true);
      setEditableProfileData({
        taiKhoan: document.getElementById("profile-account").value,
        matKhau: document.getElementById("profile-password").value,
        hoTen: document.getElementById("profile-fullName").value,
        soDT: document.getElementById("profile-tel").value,
        maLoaiNguoiDung: document.getElementById("profile-userType").value,
        maNhom: "GP01",
        email: document.getElementById("profile-email").value,
      });
    } else {
      setIsInUpdateMode(false);
      setEditableProfileData({
        taiKhoan: profileData.taiKhoan,
        matKhau: profileData.matKhau,
        hoTen: profileData.hoTen,
        soDT: profileData.soDT,
        maLoaiNguoiDung: profileData.maLoaiNguoiDung,
        maNhom: "GP01",
        email: profileData.email,
      });
      document.getElementById("profile-account").value = profileData.taiKhoan;
      document.getElementById("profile-password").value = profileData.matKhau;
      document.getElementById("profile-fullName").value = profileData.hoTen;
      document.getElementById("profile-tel").value = profileData.soDT;
      document.getElementById("profile-userType").value =
        profileData.maLoaiNguoiDung;
      document.getElementById("profile-email").value = profileData.email;
    }
  };
  const handleUpdateConfirmation = (userData) => {
    dispatch(updateProfile(userData));
    dispatch(fetchLoggedInUserProfile)
  };

  const handleCancel = () => {
    setIsInUpdateMode(false);
    setEditableProfileData({
      taiKhoan: profileData.taiKhoan,
      matKhau: profileData.matKhau,
      hoTen: profileData.hoTen,
      soDT: profileData.soDT,
      maLoaiNguoiDung: profileData.maLoaiNguoiDung,
      maNhom: "GP01",
      email: profileData.email,
    });
    document.getElementById("profile-account").value = profileData.taiKhoan;
    document.getElementById("profile-password").value = profileData.matKhau;
    document.getElementById("profile-fullName").value = profileData.hoTen;
    document.getElementById("profile-tel").value = profileData.soDT;
    document.getElementById("profile-userType").value =
      profileData.maLoaiNguoiDung;
    document.getElementById("profile-email").value = profileData.email;
  };
  const handleChange = (e) => {
    setEditableProfileData({
      ...editableProfileData,
      [e.target.title]: e.target.value,
    });
    // validation(e.target.value);

    console.log(editableProfileData);
  };

  const handleCourseRemoval = (courseId, account) => {
    userServ.courseRemoval(courseId, account);
    window.location.reload();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUserProfile);
  }, [dispatch]);
  return (
    <section className="user-profile">
      <div
        className="user-profile-outer-container"
        style={{
          paddingTop: headerHeight + "px",
          paddingBottom: footerHeight + "px",
          
        }}
      >
        <div className="user-profile-inner-container">
          <h3>Thông tin tài khoản</h3>
          <form onClick={(e) => e.preventDefault()}>
            <label htmlFor="">Email</label>
            <input
              title="email"
              id="profile-email"
              onChange={handleChange}
              className="block mx-auto profile-field"
              disabled={isInUpdateMode ? false : true}
              defaultValue={profileData.email}
              type="text"
            />
            <label htmlFor="">Họ và Tên</label>
            <input
              title="hoTen"
              id="profile-fullName"
              onChange={handleChange}
              className="block mx-auto  profile-field"
              disabled={isInUpdateMode ? false : true}
              defaultValue={profileData.hoTen}
              type="text"
            />
            <label htmlFor="">Số điện thoại</label>
            <input
              title="soDT"
              id="profile-tel"
              onChange={handleChange}
              className="block mx-auto  profile-field"
              disabled={isInUpdateMode ? false : true}
              defaultValue={profileData.soDT}
              type="text"
            />
            <label htmlFor="">Tài khoản</label>
            <input
              title="taiKhoan"
              id="profile-account"
              onChange={handleChange}
              className="block mx-auto  profile-field"
              disabled={isInUpdateMode ? false : true}
              defaultValue={profileData.taiKhoan}
              type="text"
            />
            <label htmlFor="">Mật khẩu</label>
            <input
              title="matKhau"
              id="profile-password"
              onChange={handleChange}
              className="block mx-auto  profile-field"
              disabled={isInUpdateMode ? false : true}
              defaultValue={profileData.matKhau}
              type="text"
            />
            <label htmlFor="">Loại người dùng</label>
            <select
              title="maLoaiNguoiDung"
              onChange={handleChange}
              className="block mx-auto  profile-field"
              disabled={isInUpdateMode ? false : true}
              name=""
              id="profile-userType"
            >
              <option
                selected={profileData.maLoaiNguoiDung === "HV" ? true : false}
                value={"HV"}
              >
                HV
              </option>
              <option
                selected={profileData.maLoaiNguoiDung === "GV" ? true : false}
                value={"GV"}
              >
                GV
              </option>
            </select>
            {isInUpdateMode ? (
              <div>
                <button
                  id="update-confirm-btn"
                  onClick={() => {
                    handleUpdateConfirmation(editableProfileData);
                    updateToggle();
                  }}
                >
                  Xác nhận cập nhật
                </button>
                <button
                  id="update-cancel-btn"
                  onClick={() => {
                    handleCancel();
                    updateToggle();
                  }}
                >
                  Huỷ bỏ cập nhật
                </button>
              </div>
            ) : (
              <button onClick={updateToggle} id="update-btn">
                Cập nhật thông tin
              </button>
            )}
          </form>
          <div className="mt-16 registered-courses-outer-container">
            <h3>Các khoá học đã đăng ký</h3>
            <div className="registered-courses-inner-container flex-wrap">
              {profileData.chiTietKhoaHocGhiDanh?.map((course) => {
                return (
                  <div>
                    <Card
                      hoverable
                     
                      className="registered-course-cards h-96 mb-1 overflow-y-scroll"
                      cover={<img alt="example" src={course.hinhAnh} />}
                    >
                      <Meta
                        title={course.tenKhoaHoc}
                        description={course.moTa}
                      />
                    </Card>
                    <button
                      className="course-removal-btn"
                      onClick={() => {
                        handleCourseRemoval(
                          course.maKhoaHoc,
                          profileData.taiKhoan
                        );
                      }}
                    >
                      Huỷ đăng ký
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
