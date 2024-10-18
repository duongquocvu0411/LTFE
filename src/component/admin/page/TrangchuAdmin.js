import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios'; // Thêm axios để gọi API
import HeaderAdmin from '../HeaderAdmin'; // Header Admin
import SiderbarAdmin from '../SidebarAdmin'; // Sidebar Admin
import Footer from '../Footer'; // Footer
import { toast } from 'react-toastify'; // Thông báo khi có lỗi
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Đăng ký các thành phần của ChartJS, bao gồm plugin Filler
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const TrangChuAdmin = () => {
  const [dsDoanhThuThang, setDsDoanhThuThang] = useState([]); // Lưu trữ dữ liệu doanh thu tháng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [soLuongKhachHangMoi, setSoLuongKhachHangMoi] = useState(0); // Số lượng khách hàng mới
  const [doanhThuHomNay, setDoanhThuHomNay] = useState(0); // Doanh thu hôm nay
  const [sanPhamBanChay, setSanPhamBanChay] = useState([]); // Dữ liệu sản phẩm bán chạy
  const [tongSanPhamTonKho, setTongSanPhamTonKho] = useState(0); // Tổng sản phẩm tồn kho
  const [dangtai,setDangtai]= useState(false);
  // Hàm lấy dữ liệu doanh thu tháng từ API
  const layDoanhThuThang = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/doanhthu/theothang`);
      const duLieuDaSapXep = response.data.sort((a, b) => a.nam === b.nam ? a.thang - b.thang : a.nam - b.nam);
      setDsDoanhThuThang(duLieuDaSapXep); // Cập nhật state với dữ liệu doanh thu
      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu tháng:", error);
      toast.error("Lỗi khi lấy dữ liệu doanh thu tháng!");
     // Tắt trạng thái loading khi có lỗi
    }
  };

  // Hàm lấy số lượng khách hàng mới từ API
  const laySoLuongKhachHangMoi = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhangs/moi`); // Gọi API khách hàng mới
      setSoLuongKhachHangMoi(response.data.so_luong_khach_hang_moi); // Cập nhật state số lượng khách hàng mới
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng khách hàng mới:", error);
      toast.error("Lỗi khi lấy số lượng khách hàng mới!");
    }
  };

  // Hàm lấy doanh thu hôm nay từ API
  const layDoanhThuHomNay = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/doanhthu/theongay`); // Gọi API lấy doanh thu hôm nay
      setDoanhThuHomNay(response.data.tong_doanh_thu); // Cập nhật state doanh thu hôm nay
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu hôm nay:", error);
      toast.error("Lỗi khi lấy doanh thu hôm nay!");
    }
    
  };

  // Hàm lấy dữ liệu sản phẩm bán chạy từ API
  const laySanPhamBanChay = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanphams/ban-chay`); // Gọi API sản phẩm bán chạy
      setSanPhamBanChay(response.data); // Cập nhật state sản phẩm bán chạy
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm bán chạy:", error);
      toast.error("Lỗi khi lấy dữ liệu sản phẩm bán chạy!");
    }
    
  };
   // Hàm lấy tổng sản phẩm tồn kho từ API
   const layTongSanPhamTonKho = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanphams/ton-kho`); // Gọi API lấy sản phẩm tồn kho
      setTongSanPhamTonKho(response.data.tong_san_pham_ton_kho); // Cập nhật state sản phẩm tồn kho
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy tổng sản phẩm tồn kho:", error);
      toast.error("Lỗi khi lấy tổng sản phẩm tồn kho!");
    }
    
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    layDoanhThuThang();
    laySoLuongKhachHangMoi(); // Gọi API khách hàng mới khi component được render
    layDoanhThuHomNay(); // Gọi API lấy doanh thu hôm nay khi component được render
    laySanPhamBanChay(); // Gọi API lấy sản phẩm bán chạy khi component được render
    layTongSanPhamTonKho(); // Gọi API lấy tổng sản phẩm tồn kho khi component được render
  }, []);

  // Dữ liệu cho biểu đồ doanh thu (Line chart)
  const dataLine = {
    labels: dsDoanhThuThang.map((muc) => `${muc.thang}/${muc.nam}`), // Nhãn là tháng/năm
    datasets: [
      {
        label: 'Doanh thu (triệu VND)',
        data: dsDoanhThuThang.map((muc) => muc.total_doanhthu), // Dữ liệu doanh thu theo tháng
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Dữ liệu cho biểu đồ cột (Bar chart) - sản phẩm bán chạy
  const dataBar = {
    labels: sanPhamBanChay.map((sp) => sp.tieude), // Lấy tên sản phẩm làm nhãn
    datasets: [
      {
        label: 'Số lượng bán',
        data: sanPhamBanChay.map((sp) => sp.tong_so_luong), // Lấy số lượng bán làm dữ liệu
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn cho biểu đồ
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin /> {/* Thêm Sidebar Admin */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin /> {/* Thêm Header Admin */}
          
          {/* Nội dung chính */}
          <div className="container-fluid mt-3">
            {/* Hàng đầu tiên */}
            <Row>
              <Col md={6}>
                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title>Doanh thu tháng</Card.Title>
                    {loading ? (
                      <div className='text-center'>
                        <Spinner animation='border' variant='primary'/>
                         <p>Đang tải dữ liệu...</p>
                      </div>
                      // Hiển thị loading trong khi chờ API trả về dữ liệu
                    ) : (
                      <Line data={dataLine} options={options} /> // Hiển thị biểu đồ doanh thu sau khi có dữ liệu
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title>Top sản phẩm bán chạy</Card.Title>
                    {loading ? (
                      <div className='text-center'>
                        <Spinner animation='border' variant='primary'/>
                        <p>Đang tải dữ liệu...</p>
                      </div>
                    ) : (
                      <Bar data={dataBar} options={options} /> 
                    )}
                   
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Hàng thứ hai */}
            <Row>
              <Col md={4}>
                <Card className="text-white bg-primary shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title>Khách hàng mới</Card.Title>
                    {loading ? (
                      <div className='text-center'>
                        <Spinner animation='border' variant='dark'/>
                        <p>Đang tải dữ liệu...</p>
                      </div>
                    ) : (
                      <>
                         <Card.Text>{`Tháng này có ${soLuongKhachHangMoi} khách hàng mới.`}</Card.Text> {/* Hiển thị số lượng khách hàng mới */}
                         <Link to={'/admin/khachhang'} className='btn btn-light'>Chi tiết</Link>
                         </>
                    )}
                   
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title>Doanh thu hôm nay</Card.Title>
                    {loading ? (
                      <div className='text-center'>
                        <Spinner animation='border' variant='primary'/>
                        <p>Đang tải dữ liệu...</p>
                      </div>
                    ) : (
                      <>
                         <Card.Text>{`Doanh thu hôm nay đạt ${doanhThuHomNay} VND.`}</Card.Text> {/* Hiển thị doanh thu hôm nay */}
                    <Link to={'/admin/khachhang'} className='btn btn-light'>Chi tiết</Link>
                      </>
                    )}                   
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-warning shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title>Sản phẩm tồn kho</Card.Title>
                    {loading ? (
                      <div className='text-center'>
                        <Spinner animation='border' variant='primary'/>
                        <p> Đang tải dữ liệu....</p>
                      </div>
                    ) :(
                      <>
                          <Card.Text>{`Hiện tại có ${tongSanPhamTonKho} sản phẩm đang tồn kho.`}</Card.Text> {/* Hiển thị sản phẩm tồn kho */}
                          <Link to={'/admin/sanpham'} className="btn btn-light">Chi tiết</Link>
                      </>
                    )}
                  
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Footer /> {/* Thêm Footer */}
      </div>
    </div>
  );
};

export default TrangChuAdmin;
