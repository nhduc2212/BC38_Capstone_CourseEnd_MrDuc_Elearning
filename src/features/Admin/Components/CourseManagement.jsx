import React, { useEffect, useState } from "react";
import { fetchCourseCategoryList, fetchCourseListData } from "../thunk";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Button, Modal } from "antd";
import moment from "moment";
import { adminServ } from "../Services/adminServ";

const CourseManagement = () => {
  const courseData = useSelector((state) => state.adminReducer.courseList);
  const courseCategoryData = useSelector(
    (state) => state.adminReducer.courseCategoryList
  );
  const adminData = useSelector((state) => state.userReducer.loggedInUserData);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    document.getElementById("newCourseIdAdmin").value = "";
    document.getElementById("newCourseAliasAdmin").value = "";
    document.getElementById("newCourseNameAdmin").value = "";
    document.getElementById("newCourseDescriptionAdmin").value = "";
    document.getElementById("newCourseImageAdmin").value = "";
    document.getElementById("newCourseIdAdmin").disabled=false;
    document.getElementById("newCreatorAccountId").value = "";
  };

  const handleDelete = (courseId) => {
    adminServ.deleteCourseAdmin(courseId);
    dispatch(fetchCourseListData(1));
  };

  const onSubmitNewCourse = () => {
    let newCourseData = {
      maKhoaHoc: document.getElementById("newCourseIdAdmin").value,
      biDanh: document.getElementById("newCourseAliasAdmin").value,
      tenKhoaHoc: document.getElementById("newCourseNameAdmin").value,
      moTa: document.getElementById("newCourseDescriptionAdmin").value,
      luotXem: 0,
      danhGia: 0,
      hinhAnh: document.getElementById("newCourseImageAdmin").value,
      maNhom: "GP01",
      ngayTao: moment().format("DD-MM-YYYY hh:mm:ss"),
      maDanhMucKhoaHoc: document.getElementById("newCourseCategoryAdmin").value,
      taiKhoanNguoiTao: adminData.hoTen,
    };
    adminServ.postNewCourse(newCourseData);
    dispatch(fetchCourseListData(1));
  };
  const onSubmitConfigCourse = () => {
    let configCourseData = {
      maKhoaHoc: document.getElementById("newCourseIdAdmin").value,
      biDanh: document.getElementById("newCourseAliasAdmin").value,
      tenKhoaHoc: document.getElementById("newCourseNameAdmin").value,
      moTa: document.getElementById("newCourseDescriptionAdmin").value,
      luotXem: 0,
      danhGia: 0,
      hinhAnh: document.getElementById("newCourseImageAdmin").value,
      maNhom: "GP01",
      ngayTao: moment().format("DD-MM-YYYY hh:mm:ss"),
      maDanhMucKhoaHoc: document.getElementById("newCourseCategoryAdmin").value,
      taiKhoanNguoiTao: document.getElementById("newCreatorAccountId").value,
    };
    adminServ.adminCourseAdjustment(configCourseData);
    dispatch(fetchCourseListData(1));
  };
  useEffect(() => {
    dispatch(fetchCourseListData(1));
    dispatch(fetchCourseCategoryList);
  }, [dispatch]);

  return (
    <div className="course-management-table-container">
      <button
        type="primary"
        onClick={() => {
          showModal();
          setTimeout(()=>{document.getElementById(
            "config-course-submit-button-admin"
          ).style.display = "none";
          document.getElementById(
            "add-course-submit-button-admin"
          ).style.display = "block";},1)
          
        }}
        className=" add-new-course-btn mb-12"
      >
        Thêm Khoá học
      </button>
      <Modal
        title="Thêm khoá học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onClick={(e) => e.preventDefault()} action="">
          <label htmlFor="">Mã khoá học</label>
          <input
            id="newCourseIdAdmin"
            className="block"
            type="text"
            placeholder="Mã khoá học"
            title="maKhoaHoc"
          />

          <label htmlFor="">Bí danh</label>
          <input
            id="newCourseAliasAdmin"
            className="block"
            type="text"
            placeholder="Bí danh"
            title="biDanh"
          />

          <label htmlFor="">Tên khoá học</label>
          <input
            id="newCourseNameAdmin"
            className="block"
            type="text"
            placeholder="Tên khoá học"
            title="tenKhoaHoc"
          />

          <label htmlFor="">Mô tả</label>
          <input
            id="newCourseDescriptionAdmin"
            className="block"
            type="text"
            placeholder="Mô tả khoá học"
            title="moTa"
          />

          <label htmlFor="">Lượt xem</label>
          <input
            id="newViewCountAdmin"
            className="block"
            type="text"
            title="luotXem"
            value={0}
          />

          <label htmlFor="">Oánh giá</label>
          <input
            id="newRatingCountAdmin"
            className="block"
            type="text"
            placeholder="Đánh giá"
            title="danhGia"
            value={0}
          />
          <label htmlFor="">Hình ảnh</label>
          <input
            id="newCourseImageAdmin"
            className="block"
            type="text"
            placeholder="Hình ảnh khoá học"
            title="hinhAnh"
          />
          <label htmlFor="">Danh mục khoá học</label>
          <select
            name=""
            id="newCourseCategoryAdmin"
            className="block"
            title="maDanhMucKhoaHoc"
          >
            {courseCategoryData.map((category) => (
              <option id={category.maDanhMuc+"Admin"} value={category.maDanhMuc}>{category.tenDanhMuc}</option>
            ))}
          </select>

          <label htmlFor="">Tài khoản người tạo</label>
          <input
            disabled={true}
            id="newCreatorAccountId"
            className="block"
            placeholder="Tài khoản người tạo"
            title="taiKhoanNguoiTao"
            type="text"
            value={adminData.hoTen}
          />

          <div
            className="success-course-confirm-admin"
            id="success-course-confirm-admin"
          ></div>

          <button
            onClick={() => {
              onSubmitNewCourse();
            }}
            id="add-course-submit-button-admin"
          >
            Thêm Khoá học
          </button>
          <button
            onClick={() => {
              onSubmitConfigCourse();
            }}
            id="config-course-submit-button-admin"
          >
            Điều chỉnh
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            id="course-cancel-button-admin"
          >
            Huỷ bỏ
          </button>
        </form>
      </Modal>
      <table className="w-full">
        <tr>
          <th>Stt</th>
          <th>Mã khoá học</th>
          <th>Hình ảnh</th>
          <th>Lượt xem</th>
          <th>Người tạo</th>
          <th>Thao tác</th>
        </tr>
        {courseData?.items?.map((course, index) => {
          return (
            <tr>
              <td>{(courseData.currentPage - 1) * 12 + index + 1}</td>
              <td>{course?.maKhoaHoc}</td>
              <td>
                <img width="5%" src={course?.hinhAnh} alt="" />
                <p>{course?.hinhAnh}</p>
              </td>
              <td>{course?.luotXem}</td>
              <td>{course?.nguoiTao.hoTen}</td>
              <td>
                <button
                  onClick={() => {
                    showModal();
                    setTimeout(() => {
                      document.getElementById(course.danhMucKhoaHoc.maDanhMucKhoahoc+"Admin").selected="true"
                      document.getElementById("newCourseIdAdmin").value =
                        course.maKhoaHoc;
                        document.getElementById("newCourseIdAdmin").disabled=true
                      document.getElementById("newCourseAliasAdmin").value =
                        course.biDanh;
                      document.getElementById("newCourseNameAdmin").value =
                        course.tenKhoaHoc;
                      document.getElementById(
                        "newCourseDescriptionAdmin"
                      ).value = course.moTa;
                      document.getElementById("newViewCountAdmin").value =
                        course.luotXem;
                      document.getElementById("newRatingCountAdmin").value =
                        course.danhGia;
                      document.getElementById("newCourseImageAdmin").value =
                        course.hinhAnh;
                      document.getElementById("newCreatorAccountId").value =
                        course.nguoiTao.hoTen;
                      document.getElementById(
                        "add-course-submit-button-admin"
                      ).style.display = "none";
                      document.getElementById(
                        "config-course-submit-button-admin"
                      ).style.display = "block";
                    }, 1);
                  }}
                >
                  Điều chỉnh
                </button>
                <button
                  onClick={() => {
                    handleDelete(course?.maKhoaHoc);
                  }}
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
        pageSize={12}
        total={courseData?.totalCount}
        onChange={(page, pageSize) => {
          dispatch(fetchCourseListData(page));
        }}
      />
    </div>
  );
};

export default CourseManagement;
