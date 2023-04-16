import { https } from "../../../configs/config";

export const userServ = {
    fetchUserList: () => https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung"),
    postUserData:(userData)=>https.post('/QuanLyNguoiDung/DangKy', userData),
    userLogin:(userData)=>https.post('/QuanLyNguoiDung/DangNhap',userData),
    fetchLoggedInUserData:()=>https.post('/QuanLyNguoiDung/ThongTinNguoiDung'),
    fetchLoggedInUserProfile:()=>https.post('/QuanLyNguoiDung/ThongTinTaiKhoan'),
    updateProfile:(userData)=>https.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', userData),
    courseRemoval:(courseId,account)=>{https.post("/QuanLyKhoaHoc/HuyGhiDanh",{maKhoaHoc:courseId,taiKhoan:account})}
};