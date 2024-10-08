import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { toast, ToastContainer } from 'react-toastify';


const LienHe = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    ten: '',
    email: '',
    sdt: '',
    ghichu: ''
  });

  const [error, setError] = useState(null);

  // Cập nhật dữ liệu khi người dùng nhập vào form
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;

    if (name === 'sdt') {
      if (/^\d*$/.test(value) && value.length <= 11) { 
    //kiểm tra xem chuỗi nhập vào có phải là số hay không: ^: Bắt đầu chuỗi. \d: Đại diện cho một chữ số (0-9).*: Cho phép lặp lại ký tự trước nó (các chữ số) 0 hoặc nhiều lần.$: Kết thúc chuỗi.
        setDuLieuForm({
          ...duLieuForm,
          [name]: value,
        });
      }
    } else {
      setDuLieuForm({
        ...duLieuForm,
        [name]: value,
      });
    }
  };

  // Xử lý khi người dùng nhấn nút gửi
  const xuLyGuiForm = (e) => {
    e.preventDefault();

  // Kiểm tra các trường bắt buộc
  if (!duLieuForm.ten) {
    toast.error('Họ tên không được bỏ trống.');
    return;
  }
  if (!duLieuForm.email) {
    toast.error('Email không được bỏ trống.');
    return;
  }
  if (!duLieuForm.sdt) {
    toast.error('Số điện thoại không được bỏ trống.');
    return;
  }
  if (duLieuForm.sdt.length < 10) {
    toast.error('Số điện thoại phải có ít nhất 10 số.');
    return;
  }
  if (!duLieuForm.ghichu) {
    toast.error('Nội dung liên hệ không được bỏ trống.');
    return;
  }
    axios.post(`${process.env.REACT_APP_BASEURL}/api/lienhe`, duLieuForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setError(null); // Xóa lỗi nếu gửi thành công
        toast.success('Đã gửi  liên hệ thành công!'); // Thông báo thành công

        // Reset form về trạng thái ban đầu
        setDuLieuForm({
          ten: '',
          email: '',
          sdt: '',
          ghichu: ''
        });
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Chi tiết lỗi từ server:', error.response.data);
          setError(error.response.data);
          toast.error('Lỗi khi gửi form liên hệ!');
        } else {
          console.error('Lỗi khi gửi form liên hệ:', error);
          setError({ message: 'Lỗi khi gửi form liên hệ!' });
          toast.error('Lỗi khi gửi form liên hệ!');
        }
      });
  };

  return (
    <>
     <HeaderUsers />
      <div className="container mt-5 py-5">
        <br /> <br /> <br />
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4 text-center">Liên Hệ Với Chúng Tôi</h2>
            <form onSubmit={xuLyGuiForm}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="ten"
                  id="formHoTen"
                  className="form-control"
                  placeholder="Họ tên"
                  value={duLieuForm.ten}
                  onChange={thayDoiDuLieu}
                />
                <label htmlFor="formHoTen">Họ Tên</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  id="formEmail"
                  className="form-control"
                  placeholder="Email"
                  value={duLieuForm.email}
                  onChange={thayDoiDuLieu}
                />
                <label htmlFor="formEmail">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="sdt"
                  id="formSoDienThoai"
                  className="form-control"
                  placeholder="Số điện thoại"
                  value={duLieuForm.sdt}
                  onChange={thayDoiDuLieu}
                />
                <label htmlFor="formSoDienThoai">Số Điện Thoại</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  name="ghichu"
                  id="formGhiChu"
                  rows="5"
                  className="form-control"
                  placeholder="Nội dung liên hệ"
                  value={duLieuForm.ghichu}
                  onChange={thayDoiDuLieu}
                  style={{ height: '100px' }}
                ></textarea>
                <label htmlFor="formGhiChu">Nội Dung</label>
              </div>

              <button type="submit" className="btn btn-primary">
                Gửi Liên Hệ
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LienHe;
