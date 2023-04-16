import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Pagination, Button, Modal } from "antd";
import { fetchSearchingUserList, fetchSecondaryUserList, fetchUserListData } from "../thunk";
import { adminServ } from "../Services/adminServ";
import { duplicateValidation, validation } from "../Utils/verify";
import './styles/userManagement.scss'

const UserManagement = () => {
  // MODAL RELATED
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [userInputDataAdmin, setUserInputDataAdmin] = useState({
    taiKhoan: "",
    matKhau:"",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung:"HV",
    maNhom:"GP01"
  });
  
  // handle the change of new user input's field
  const handleAddNewChange = (e) => {
    setUserInputDataAdmin({ ...userInputDataAdmin, [e.target.title]: e.target.value });
    validation(e.target.value);
    document.getElementById("success-confirm-admin").innerHTML = "";
    console.log(userInputDataAdmin);
  };

   // handle submission of new user
  const onSubmitNewUser = (userData) => {
    if (validation() && duplicateValidation(userData)) {
      let sortedUserInput = {
        taiKhoan: userInputDataAdmin.taiKhoan,
        matKhau: userInputDataAdmin.matKhau,
        hoTen: userInputDataAdmin.hoTen,
        soDt: userInputDataAdmin.soDt,
        maLoaiNguoiDung: userInputDataAdmin.maLoaiNguoiDung,
        maNhom: userInputDataAdmin.maNhom,
        email: userInputDataAdmin.email,        
      };
      adminServ.postNewUserData(sortedUserInput);
      document.getElementById("success-confirm-admin").innerHTML =
        "Đăng ký thành công";
    } else {
      document.getElementById("success-confirm-admin").innerHTML = "";
    }
  };

  // CALL API THE 2nd data for User information for Password
  const unsortedUserData = useSelector(
    (state) => state.adminReducer.userUnsortedData
  );
  const userData = useSelector((state) => state.adminReducer.userData);
  const userDataFiltered=useSelector((state) => state.adminReducer.userDataFiltered);
  // toogle the Adjustment mode
  const adjustmentModeOn = (
    idtaiKhoan,
    idmatKhau,
    idhoTen,
    idemail,
    idsoDt,
    confirmBtnId,
    adjustToggleBtnId,
    cancelBtnId,
    deleteBtnId
  ) => {
    let taiKhoan = document.getElementById(idtaiKhoan);
    let matKhau = document.getElementById(idmatKhau);
    let hoTen = document.getElementById(idhoTen);
    let email = document.getElementById(idemail);
    let soDt = document.getElementById(idsoDt);
    let conBtnId = document.getElementById(confirmBtnId);
    let toggleBtnId = document.getElementById(adjustToggleBtnId);
    let canBtnId = document.getElementById(cancelBtnId);
    let delBtnId = document.getElementById(deleteBtnId);

    matKhau.style.backgroundColor = "white";
    hoTen.style.backgroundColor = "white";
    email.style.backgroundColor = "white";
    soDt.style.backgroundColor = "white";

    matKhau.disabled = false;
    hoTen.disabled = false;
    email.disabled = false;
    soDt.disabled = false;
    conBtnId.style.display = "inline-block";
    toggleBtnId.style.display = "none";
    canBtnId.style.display = "inline-block";
    delBtnId.style.display = "none";
  };

  // delete User
  const handleDelete = (TaiKhoan) => {
    adminServ.deleteUser(TaiKhoan);
    dispatch(fetchUserListData(1));
    dispatch(fetchSecondaryUserList);
  };

  // handle searching function
  const handleSearch = ()=>{
    let keyWord = document.getElementById('admin-user-searching-keyword')
    dispatch(fetchSearchingUserList(1, keyWord))
  }

  // handle the submission of adjustment
  const handleAdjustmentSubmit = (
    idtaiKhoan,
    idmatKhau,
    idhoTen,
    idemail,
    idsoDt,
    maLoaiNguoiDung,
    taiKhoan_value,
    matKhau_value,
    email_value,
    soDt_value,
    hoTen_value,
    confirmBtnId,
    adjustToggleBtnId,
    cancelBtnId,
    deleteBtnId
  ) => {
    let userData = {
      taiKhoan: taiKhoan_value,
      matKhau:
        document.getElementById(idmatKhau).value === ""
          ? matKhau_value
          : document.getElementById(idmatKhau).value,
      hoTen:
        document.getElementById(idhoTen).value === ""
          ? hoTen_value
          : document.getElementById(idhoTen).value,
      soDt:
        document.getElementById(idsoDt).value === ""
          ? soDt_value
          : document.getElementById(idsoDt).value,
      maLoaiNguoiDung,
      maNhom: "GP01",
      email:
        document.getElementById(idemail).value === ""
          ? email_value
          : document.getElementById(idemail).value,
    };

    let conBtnId = document.getElementById(confirmBtnId);
    let toggleBtnId = document.getElementById(adjustToggleBtnId);
    let canBtnId = document.getElementById(cancelBtnId);
    let delBtnId = document.getElementById(deleteBtnId);
    adminServ.adminUpdateUser(userData);
    dispatch(fetchUserListData(1));
    dispatch(fetchSecondaryUserList);
    document.getElementById(idmatKhau).disabled = true;
    document.getElementById(idhoTen).disabled = true;
    document.getElementById(idemail).disabled = true;
    document.getElementById(idsoDt).disabled = true;
    document.getElementById(idmatKhau).style.background = "none";
    document.getElementById(idhoTen).style.background = "none";
    document.getElementById(idemail).style.background = "none";
    document.getElementById(idsoDt).style.background = "none";
    conBtnId.style.display = "none";
    toggleBtnId.style.display = "inline-block";
    canBtnId.style.display = "none";
    delBtnId.style.display = "inline-block";
  };

  // cancel the adjustment
  const adjustmentCancel = (
    idtaiKhoan,
    idmatKhau,
    idhoTen,
    idemail,
    idsoDt,
    confirmBtnId,
    adjustToggleBtnId,
    cancelBtnId,
    deleteBtnId
  ) => {
    let taiKhoan = document.getElementById(idtaiKhoan);
    let matKhau = document.getElementById(idmatKhau);
    let hoTen = document.getElementById(idhoTen);
    let email = document.getElementById(idemail);
    let soDt = document.getElementById(idsoDt);
    let conBtnId = document.getElementById(confirmBtnId);
    let toggleBtnId = document.getElementById(adjustToggleBtnId);
    let canBtnId = document.getElementById(cancelBtnId);
    let delBtnId = document.getElementById(deleteBtnId);

    matKhau.style.background = "none";
    hoTen.style.background = "none";
    email.style.background = "none";
    soDt.style.background = "none";
    taiKhoan.value = "";
    matKhau.value = "";
    hoTen.value = "";
    email.value = "";
    soDt.value = "";
    dispatch(fetchUserListData(1));
    dispatch(fetchSecondaryUserList);
    matKhau.disabled = true;
    hoTen.disabled = true;
    email.disabled = true;
    soDt.disabled = true;
    conBtnId.style.display = "none";
    toggleBtnId.style.display = "inline-block";
    canBtnId.style.display = "none";
    delBtnId.style.display = "inline-block";
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserListData(1));
    dispatch(fetchSecondaryUserList);
  }, [dispatch]);
  return (
    <div className="user-management-table-container">
      <button

        type="primary"
        onClick={showModal}
        className="block mx-auto add-new-user-btn mb-12"
      >
        Thêm người dùng
      </button>
      <label className="inline-block mr-3" htmlFor="">Tìm kiếm người dùng: </label>
      
      <input id="admin-user-searching-keyword" className="mb-4" type="text" placeholder="Nhập từ khoá"/>
      <button onClick={(keyWord)=>{handleSearch(keyWord)}} className="ml-3">Tìm</button>
      <table className="w-full">
        <tr>
          <th>Stt</th>
          <th>Tên tài khoản</th>
          <th>Mật khẩu</th>
          <th>Họ và Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </tr>
        {userData?.items?.map((user, index) => {
          return (
            <tr key={user?.TaiKhoan}>
              <td>{(userData?.currentPage - 1) * 12 + index + 1}</td>
              <td>
                <input
                  disabled={true}
                  id={user?.taiKhoan + user?.taiKhoan + "taiKhoan"}
                  type="text"
                  placeholder={user?.taiKhoan}
                />
              </td>
              <td>
                <input
                  disabled={true}
                  id={user?.taiKhoan + "matKhau"}
                  type="text"
                  placeholder={unsortedUserData
                    .filter((item) => item.taiKhoan === user?.taiKhoan)
                    .map((pass) => pass.matKhau)}
                />
              </td>
              <td>
                <input
                  disabled={true}
                  id={user?.hoTen + user?.taiKhoan + "hoTen"}
                  type="text"
                  placeholder={user?.hoTen}
                />
              </td>

              <td>
                <input
                  disabled={true}
                  id={user?.email + user?.taiKhoan + "email"}
                  type="text"
                  placeholder={user?.email}
                />
              </td>
              <td>
                <input
                  disabled={true}
                  id={user?.soDT + user?.taiKhoan + "soDT"}
                  type="text"
                  placeholder={user?.soDT}
                />
              </td>
              <td>
                <button
                  className="mx-auto"
                  id={"confirm-adjustment-btn" + user?.taiKhoan}
                  style={{ display: "none" }}
                  onClick={() => {
                    handleAdjustmentSubmit(
                      user?.taiKhoan + user?.taiKhoan + "taiKhoan",
                      user?.taiKhoan + "matKhau",
                      user?.hoTen + user?.taiKhoan + "hoTen",
                      user?.email + user?.taiKhoan + "email",
                      user?.soDT + user?.taiKhoan + "soDT",
                      user?.maLoaiNguoiDung,
                      user?.taiKhoan,
                      user?.matKhau,
                      user?.email,
                      user?.soDt,
                      user?.hoTen,
                      "confirm-adjustment-btn" + user?.taiKhoan,
                      "admin-adjustment-btn" + user?.taiKhoan,
                      "cancel-adjustment-btn" + user?.taiKhoan,
                      "admin-delete-btn" + user?.taiKhoan
                    );
                  }}
                >
                  Xác nhận
                </button>{" "}
                <button
                  id={"cancel-adjustment-btn" + user?.taiKhoan}
                  className="mx-auto"
                  style={{ display: "none" }}
                  onClick={() => {
                    adjustmentCancel(
                      user?.taiKhoan + user?.taiKhoan + "taiKhoan",
                      user?.taiKhoan + "matKhau",
                      user?.hoTen + user?.taiKhoan + "hoTen",
                      user?.email + user?.taiKhoan + "email",
                      user?.soDT + user?.taiKhoan + "soDT",
                      "confirm-adjustment-btn" + user?.taiKhoan,
                      "admin-adjustment-btn" + user?.taiKhoan,
                      "cancel-adjustment-btn" + user?.taiKhoan,
                      "admin-delete-btn" + user?.taiKhoan
                    );
                  }}
                >
                  Huỷ bỏ
                </button>
                <button
                  id={"admin-adjustment-btn" + user?.taiKhoan}
                  onClick={() => {
                    adjustmentModeOn(
                      user?.taiKhoan + user?.taiKhoan + "taiKhoan",
                      user?.taiKhoan + "matKhau",
                      user?.hoTen + user?.taiKhoan + "hoTen",
                      user?.email + user?.taiKhoan + "email",
                      user?.soDT + user?.taiKhoan + "soDT",
                      "confirm-adjustment-btn" + user?.taiKhoan,
                      "admin-adjustment-btn" + user?.taiKhoan,
                      "cancel-adjustment-btn" + user?.taiKhoan,
                      "admin-delete-btn" + user?.taiKhoan
                    );
                  }}
                >
                  Điều chỉnh
                </button>{" "}
                <button
                  onClick={() => {
                    handleDelete(user?.taiKhoan);
                  }}
                  id={"admin-delete-btn" + user?.taiKhoan}
                >
                  Xoá
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      <Pagination
        className="mt-20 mb-20"
        id="regular-pagination"
        pageSize={12}
        total={userData?.totalCount}
        onChange={(page, pageSize) => {
          dispatch(fetchUserListData(page));
        }}
      />
  
      <Modal
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onClick={(e) => e.preventDefault()} action="">
          <label htmlFor="">Tài khoản</label>
          <input
            onChange={handleAddNewChange}
            id="accountInputAdmin"
            className="block"
            type="text"
            placeholder="Tài khoản"
            title="taiKhoan"
          />
          <p id="accountErrorAdmin"></p>

          <label htmlFor="">Mật khẩu</label>
          <input
            onChange={handleAddNewChange}
            id="passwordInputAdmin"
            className="block"
            type="text"
            placeholder="Mật khẩu"
            title="matKhau"
          />
          <p id="passwordErrorAdmin"></p>

          <label htmlFor="">Họ tên</label>
          <input
            onChange={handleAddNewChange}
            id="fullNameInputAdmin"
            className="block"
            type="text"
            placeholder="Họ và tên"
            title="hoTen"
          />
          <p id="fullNameErrorAdmin"></p>

          <label htmlFor="">Email</label>
          <input
            onChange={handleAddNewChange}
            id="emailInputAdmin"
            className="block"
            type="text"
            placeholder="Email"
            title="email"
          />
          <p id="emailErrorAdmin"></p>

          <label htmlFor="">Loại người dùng</label>
          <select
            onChange={handleAddNewChange}
            id="userTypeInputAdmin"
            className="block"

            title="maLoaiNguoiDung"
          >
            <option value="HV">Học viên</option>
            <option value="GV">Giáo vụ</option>
         </select>
          <p id="emailErrorAdmin"></p>

          <label htmlFor="">Số điện thoại</label>
          <input
            onChange={handleAddNewChange}
            id="telInputAdmin"
            className="block"
            type="text"
            placeholder="Số điện thoại"
            title="soDt"
          />
          <p id="telErrorAdmin"></p>
          <div className="success-confirm-admin" id="success-confirm-admin"></div>
          
          <button
            onClick={() => {
              onSubmitNewUser(userInputDataAdmin);
            }}
            id="signup-submit-button-admin"
          >
            Đăng ký
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
