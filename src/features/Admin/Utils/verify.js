import { connect, useSelector } from "react-redux";
import { adminServ } from "../Services/adminServ";

export const validation = (target, configVal) => {
  let fullName = document.getElementById("fullNameInputAdmin").value;
  let account = document.getElementById("accountInputAdmin").value;
  let password = document.getElementById("passwordInputAdmin").value;
  let email = document.getElementById("emailInputAdmin").value;
  let tel = document.getElementById("telInputAdmin").value;
  let isValid;

  const emptyDetect = (targetedID, configuredVal) => {
    if (targetedID.length <= 0) {
      document.getElementById(configuredVal.errorCode).innerHTML =
        "Không được để trống";
      return false;
    } else {
      document.getElementById(configuredVal.errorCode).innerHTML = "";
      return true;
    }
  };

  const lengthValidation = (targetedID, configuredVal) => {
    if (configuredVal.min == undefined) {
      configuredVal.min = 0;
    }
    if (
      targetedID.length < configuredVal.min ||
      targetedID.length > configuredVal.max
    ) {
      document.getElementById(configuredVal.errorCode).innerHTML =
        "Nhập vào giá trị có độ dài từ " +
        configuredVal.min +
        " đến " +
        configuredVal.max +
        " ký tự.";
      return false;
    } else {
      document.getElementById(configuredVal.errorCode).innerHTML = "";
      return true;
    }
  };

  const regEx = (targetedID, configuredVal) => {
    if (configuredVal.regEx.test(targetedID) === false) {
      document.getElementById(configuredVal.errorCode).innerHTML =
        configuredVal.errorMessage;
      return false;
    } else {
      document.getElementById(configuredVal.errorCode).innerHTML = "";
      return true;
    }
  };



  const fullNameValidation =
    emptyDetect(fullName, { errorCode: "fullNameErrorAdmin" }) &&
    regEx(fullName, {
      errorCode: "fullNameErrorAdmin",
      regEx:
        /^[A-zaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$/g,
      errorMessage: "Tên không được có giá trị số hoặc ký tự đặc biệt",
    });

  const accountValidation =
    emptyDetect(account, { errorCode: "accountErrorAdmin" }) &&
    lengthValidation(account, {
      errorCode: "accountErrorAdmin",
      min: 4,
      max: 16,
    }) &&
    regEx(account, {
      errorCode: "accountErrorAdmin",
      regEx: /^[0-9A-z]{4,16}$/g,
      errorMessage: "Tài khoản không được có giá trị đặc biệt",
    });
  const passValidation =
    emptyDetect(password, { errorCode: "passwordErrorAdmin" }) &&
    lengthValidation(password, {
      errorCode: "passwordErrorAdmin",
      min: 6,
      max: 10,
    }) &&
    regEx(password, {
      errorCode: "passwordErrorAdmin",
      regEx:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#^?&])[A-Za-z\d@$!%*?#^&]{6,10}$/,
      errorMessage:
        "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
    });

  let emailValidation =
    emptyDetect(email, { errorCode: "emailErrorAdmin" }) &&
    regEx(email, {
      errorCode: "emailErrorAdmin",
      regEx:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: "Email không đúng định dạng",
    });
  const telValidation =
    emptyDetect(tel, { errorCode: "telErrorAdmin" }) &&
    regEx(tel, {
      errorCode: "telErrorAdmin",
      regEx: /[0-9]/g,
      errorMessage:
        "Số điện thoại không được có ký tự chữ và không có dấu cách",
    }) &&
    lengthValidation(tel, {
      errorCode: "telErrorAdmin",
      min: 10,
      max: 20,
    });

  accountValidation &&
  fullNameValidation &&
  emailValidation &&
  passValidation &&
  telValidation
    ? (isValid = true)
    : (isValid = false);
  if (isValid === true) {
    document
      .getElementById("signup-submit-button-admin")
      .classList.remove("disabled"); return true
  } else {
    document.getElementById("signup-submit-button-admin").classList.add("disabled"); return false
  }
};

export const duplicateValidation = (userData) => {
  const inputAccount = document.getElementById("accountInputAdmin").value;
  const inputEmail = document.getElementById("emailInputAdmin").value;
  const inputTel = document.getElementById("telInputAdmin").value;
 
  for(let i=0; i<userData.length;i++){
    console.log(userData[i])
    if(inputAccount==userData[i].taiKhoan){
      document.getElementById('accountErrorAdmin').innerHTML=('Tài khoản đã được sử dụng')
    }
    if(inputEmail==userData[i].email){
      document.getElementById('emailErrorAdmin').innerHTML=('Email đã được sử dụng')
    }
    if(inputTel==userData[i].soDT){
      document.getElementById('telErrorAdmin').innerHTML=('Số điện thoại đã được sử dụng')
    }
    if(inputAccount==userData[i].taiKhoan||inputEmail==userData[i].email||inputTel==userData[i].soDT){
      return false
    }
  }
  return true
  
};
