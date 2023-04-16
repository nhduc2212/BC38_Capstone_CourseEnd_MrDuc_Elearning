import React, { useState, useEffect, useRef } from "react";
import '../styles/Footer.scss'
import { useDispatch } from "react-redux";

const Footer = () => {

  const ref = useRef()
  const dispatch = useDispatch()
  let getFooterHeight = () => async (dispatch) => {
    dispatch({
      type: "GET_FOOTER_HEIGHT",
      payload: ref.current.offsetHeight,
    });
  };
  useEffect(() => {
    dispatch(getFooterHeight());
  });


  return (
    <footer ref={ref} id="outer-footer-container">
      <div className="footer-container">
        <div className="footer-column-1">
          <div className="icon-quote">
            <div className="icon-container">
              <img
                src="https://cybersoft.edu.vn/wp-content/uploads/2017/04/MAX-OP1.png"
                alt=""
              />
            </div>
            <div className="footer-quote-container"><p>Cybersoft Academy - Hệ thống đào tạo lập trình chuyến sâu theo dự án thực tế</p></div>
          </div>
        </div>
        <div className="footer-column-2">
          <div className="event-promo">
            <h3>Nhận tin sự kiện và khuyến mãi</h3>
            <p>Để lại email để nhận thông báo về sự kiện và khuyển mãi của trung tâm</p>
            <div className="mb-3">
              <input className="w-full mb-1" type="email" placeholder="deptrai@handsome.com"  />
              <button className="event-promo-button">Đăng ký nhận thông tin</button>
            </div>
          </div>
        </div>
        <div className="footer-column-3">
          <div className="contact-form">
            <h3>Đăng ký tư vấn</h3>
            <form action="">
              <input type="text" placeholder="Họ và tên"/>
              <input type="email" placeholder="Email liên hệ"/>
              <input type="text" placeholder="Điện thoại liên hệ"/>
              <button className="contact-info-button">Đăng ký tư vấn</button>
            </form>

          </div>
        </div>
        <div className="footer-column-4">
          <ul>
            <li><i class="fa-solid fa-location-dot"></i><p>Cơ sở 1: 376 Võ Văn Tần - Quận 3</p></li>
            <li><i class="fa-solid fa-location-dot"></i><p>Cơ sở 2: 376 Võ Văn Tần - Quận 3</p></li>
            <li><i class="fa-solid fa-location-dot"></i><p>Cơ sở 3: 376 Võ Văn Tần - Quận 3</p></li>
            <li><i class="fa-solid fa-location-dot"></i><p>Cơ sở 4: 376 Võ Văn Tần - Quận 3</p></li>
            <li><i class="fa-solid fa-phone"></i><p>096.407.5035</p></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
