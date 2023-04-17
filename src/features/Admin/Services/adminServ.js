import { https } from "../../../configs/config";

export const adminServ = {
  fetchUserList: (pageSize, page) =>
    https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang", {
      params: {
        maNhom: "GP01",
        page,
        pageSize,
      }
    }),
  fetchCourseList: (pageSize, page) =>
    https.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang", {
      params: {
        maNhom: "GP01",
        page,
        pageSize,
      }
    }),
    fetchCourseCategoryList:()=>https.get('/QuanLyKhoaHoc/LayDanhMucKhoaHoc'),
    deleteUser:(TaiKhoan)=>https.delete("/QuanLyNguoiDung/XoaNguoiDung", {params:{
      TaiKhoan
    }} ),
    fetchSecondaryUserData:()=>https.get("/QuanLyNguoiDung/TimKiemNguoiDung",{params:{
        MaNhom:"GP01"
    }}),
    adminUpdateUser:(userData)=> https.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData),

    postNewUserData:(userData)=> https.post('/QuanLyNguoiDung/ThemNguoiDung', userData),
    fetchFoundUserData:(keyWord, pageSize, page)=>https.get('/QuanLyNguoiDung/TimKiemNguoiDung', {params:{
      maNhom:"GP01",
      tuKhoa:keyWord,
      page,
      pageSize,
    }}),
    postNewCourse: (courseData)=> https.post('/QuanLyKhoaHoc/ThemKhoaHoc', courseData),
    deleteCourseAdmin:(courseId)=>https.delete('/QuanLyKhoaHoc/XoaKhoaHoc', {params:{MaKhoaHoc:courseId}} ),
    adminCourseAdjustment:(courseData)=>https.post('/QuanLyKhoaHoc/CapNhatKhoaHoc', courseData),
};

