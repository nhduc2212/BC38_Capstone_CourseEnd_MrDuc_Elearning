import { https } from "../../../configs/config";

export const courseServ = {
    fetchCourseData: () => https.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc"),
    fetchCourseType: () => https.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc"),
    fetchCourseListDetails: (listId) => https.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
        params: {
          maDanhMuc: listId,
        },
      }),
      fetchCourseDetails:(courseId)=>https.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc",{
        params:{
          maKhoaHoc: courseId
        }
      }),

courseRegistration:(courseId,account)=>{https.post("/QuanLyKhoaHoc/DangKyKhoaHoc",{maKhoaHoc:courseId,taiKhoan:account})},


};
