import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validation, duplicateValidation } from "./Utils/verify.js"
import './Styles/UserReg.scss'
import { fetchUserList } from './thunk.js'
import { userServ } from './Services/userServ.js'
import { scrollToTop } from '../../Utils/ultiScript.js'

const UserReg = () => {
  const [userInputData, setUserInputData] = useState({
    taiKhoan: "",
    matKhau:"",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung:"GP01",
  });
  const headerHeight = useSelector((state)=>state.ultiReducer.headerHeight)
  const footerHeight = useSelector((state)=>state.ultiReducer.footerHeight)
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setUserInputData({ ...userInputData, [e.target.title]: e.target.value });
    validation(e.target.value);
    document.getElementById("success-confirm").innerHTML = "";
    console.log(userInputData);
  };
  const onSubmit = (userData) => {
    if (validation() && duplicateValidation(userData)) {
      let sortedUserInput = {
        taiKhoan: userInputData.taiKhoan,
        matKhau: userInputData.matKhau,
        hoTen: userInputData.hoTen,
        soDt: userInputData.soDt,
        maNhom: userInputData.maLoaiNguoiDung,
        email: userInputData.email,        
      };
      userServ.postUserData(sortedUserInput);
      document.getElementById("success-confirm").innerHTML =
        "Đăng ký thành công";
    } else {
      document.getElementById("success-confirm").innerHTML = "";
    }
  };

  useEffect(() => {
    dispatch(fetchUserList);
    scrollToTop()
  }, []);
  return (
    <section className='user-registration'>
      <div className='user-registration-outer-container' style={{paddingTop:headerHeight+"px",paddingBottom:footerHeight+"px", height:100+"vh"}}>
        <div className='user-registration-inner-container'>
<form onClick={(e) => e.preventDefault()} action="">
<label htmlFor="">Tài khoản</label>
<input onChange={handleChange} id='accountInput' className='block' type="text" placeholder='Tài khoản' title="taiKhoan"/>
<p id="accountError"></p>

<label htmlFor="">Mật khẩu</label>
<input onChange={handleChange} id='passwordInput' className='block' type="text" placeholder='Mật khẩu' title="matKhau"/>
<p id="passwordError"></p>

<label htmlFor="">Nhập lại mật khẩu</label>
<input onChange={handleChange} id='passwordConfirmInput' className='block' type="text" placeholder='Nhập lại mật khẩu' title="xacNhanMatKhau"/>
<p id="passwordConfirmError"></p>

<label htmlFor="">Họ tên</label>
<input onChange={handleChange} id='fullNameInput' className='block' type="text" placeholder='Họ và tên' title="hoTen" />
<p id="fullNameError"></p>

<label htmlFor="">Email</label>
<input onChange={handleChange} id='emailInput' className='block' type="text" placeholder='Email' title="email" />
<p id="emailError"></p>

<label htmlFor="">Số điện thoại</label>
<input onChange={handleChange} id='telInput' className='block' type="text" placeholder='Số điện thoại' title="soDt" />
<p id="telError"></p>
<div className="success-confirm" id="success-confirm"></div>
<button onClick={()=>{onSubmit(userInputData)}} id='signup-submit-button'>Đăng ký</button>
</form>


        </div>
      </div>
    </section>
  )
}

export default UserReg