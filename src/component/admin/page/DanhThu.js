import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler } from 'chart.js'; // Đăng ký Filler plugin
import axios from "axios";
import { toast } from "react-toastify";
import ChiTietDoanhThuModal from "../modla/ChiTietDoanhThuModal";
import Footer from "../Footer";
import HeaderAdmin from "../HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin";
import { Link } from "react-router-dom";

// Đăng ký các thành phần của ChartJS, bao gồm plugin Filler
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler);

const BieuDoDoanhThu = () => {
  // Khai báo các state cần thiết
  const [dsDoanhThuThang, setDsDoanhThuThang] = useState([]); // Danh sách doanh thu theo tháng
  const [thangDuocChon, setThangDuocChon] = useState(null); // Tháng được chọn để xem chi tiết
  const [chiTietDoanhThu, setChiTietDoanhThu] = useState(null); // Chi tiết doanh thu của tháng
  const [hienThiModal, setHienThiModal] = useState(false); // Hiển thị modal chi tiết doanh thu
  const [kieuBieuDo, setKieuBieuDo] = useState('Bar'); // Kiểu biểu đồ: cột (Bar) hoặc đường (Line)

  // Hàm lấy dữ liệu doanh thu theo tháng
  const layDoanhThuThang = async () => {
    try {
      const phanHoi = await axios.get(`${process.env.REACT_APP_BASEURL}/api/revenue/monthly`);
      // Sắp xếp dữ liệu theo tháng và năm
      const duLieuDaSapXep = phanHoi.data.sort((a, b) => a.year === b.year ? a.month - b.month : a.year - b.year);
      setDsDoanhThuThang(duLieuDaSapXep); // Lưu dữ liệu vào state
    } catch (loi) {
      console.error("Lỗi khi lấy dữ liệu doanh thu hàng tháng:", loi);
      toast.error("Lỗi khi lấy dữ liệu doanh thu hàng tháng!");
    }
  };

  // Hàm lấy chi tiết doanh thu của một tháng cụ thể
  const layChiTietDoanhThu = async (nam, thang) => {
    try {
      const phanHoi = await axios.get(`${process.env.REACT_APP_BASEURL}/api/doanhthu/${nam}/${thang}`);
      setChiTietDoanhThu(phanHoi.data); // Lưu dữ liệu chi tiết vào state
      setHienThiModal(true); // Hiển thị modal
    } catch (loi) {
      console.error("Lỗi khi lấy chi tiết doanh thu:", loi);
      toast.error("Lỗi khi lấy chi tiết doanh thu!");
    }
  };

  // Hàm này chạy một lần khi component được render
  useEffect(() => {
    layDoanhThuThang();
  }, []);

  // Dữ liệu cho biểu đồ
  const duLieuBieuDo = {
    labels: dsDoanhThuThang.map((muc) => `${muc.month}/${muc.year}`), // Nhãn là tháng/năm
    datasets: [
      {
        label: "Doanh thu (VND)", // Tên biểu đồ
        data: dsDoanhThuThang.map((muc) => muc.total_revenue), // Doanh thu theo tháng
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Màu nền biểu đồ cột
        borderColor: "rgba(54, 162, 235, 1)", // Màu viền biểu đồ cột
        fill: true, // Kích hoạt tô màu (cho biểu đồ đường)
      },
    ],
  };

  // Tùy chọn cho biểu đồ
  const tuyChonBieuDo = {
    // Sự kiện khi người dùng click vào cột biểu đồ
    onClick: (suKien, phanTu) => {
      if (phanTu.length > 0) {
        const chiSoCot = phanTu[0].index; // Lấy chỉ số cột người dùng click
        const thangChon = dsDoanhThuThang[chiSoCot]; // Lấy tháng tương ứng với cột
        setThangDuocChon(thangChon); // Lưu tháng được chọn vào state
        layChiTietDoanhThu(thangChon.year, thangChon.month); // Lấy chi tiết doanh thu của tháng được chọn
      }
    },
    maintainAspectRatio: false, // Không giữ tỷ lệ mặc định
  };

  return (
    <div id="wrapper">
      <SidebarAdmin /> {/* Thanh điều hướng admin */}

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Nội dung chính */}
        <div id="content">
          <HeaderAdmin /> {/* Header admin */}

          {/* Nội dung trang */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Biểu đồ doanh thu hàng tháng</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Trang chủ</Link></li>
                    <li className="breadcrumb-item active">Biểu đồ doanh thu</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Dòng chứa biểu đồ */}
            <div className="row">
              {/* Cột chứa biểu đồ */}
              <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                  {/* Tiêu đề card */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Doanh thu</h6>
                    <div>
                      {/* Nút chọn loại biểu đồ */}
                      <button className="btn btn-primary me-2" onClick={() => setKieuBieuDo('Bar')}>Biểu đồ cột</button>
                      <button className="btn btn-secondary" onClick={() => setKieuBieuDo('Line')}>Biểu đồ đường</button>
                    </div>
                  </div>
                  {/* Phần thân card chứa biểu đồ */}
                  <div className="card-body">
                    <div className="chart-area" style={{ position: "relative", height: "50vh", width: "100%" }}>
                      {/* Hiển thị biểu đồ tùy thuộc vào kiểu biểu đồ người dùng chọn */}
                      {kieuBieuDo === 'Bar' ? (
                        <Bar data={duLieuBieuDo} options={tuyChonBieuDo} />
                      ) : (
                        <Line data={duLieuBieuDo} options={tuyChonBieuDo} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Kết thúc nội dung trang */}
        </div>
        <Footer /> {/* Footer */}
      </div>

      {/* Modal hiển thị chi tiết doanh thu */}
      <ChiTietDoanhThuModal
        show={hienThiModal} // Kiểm tra xem có hiển thị modal không
        onHide={() => setHienThiModal(false)} // Hàm đóng modal
        thangDuocChon={thangDuocChon} // Tháng được chọn để hiển thị chi tiết
        chiTietDoanhThu={chiTietDoanhThu} // Dữ liệu chi tiết doanh thu
      />
    </div>
  );
};

export default BieuDoDoanhThu;
