import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import Footer from '../Footer';
import { toast } from 'react-toastify';
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
  const [dsDoanhThuThang, setDsDoanhThuThang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soLuongKhachHangMoi, setSoLuongKhachHangMoi] = useState(0);
  const [doanhThuHomNay, setDoanhThuHomNay] = useState(0);
  const [sanPhamBanChay, setSanPhamBanChay] = useState([]);
  const [tongSanPhamTonKho, setTongSanPhamTonKho] = useState(0);
  const [dangtai, setDangtai] = useState(false);

const layDoanhThuThang = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/HoaDon/DoanhThuTheoTungThang`);
    console.log("Data from API:", response.data); // Thêm dòng này
    const duLieuDaSapXep = response.data.sort((a, b) => 
      a.year === b.month ? a.month - b.month : a.year - b.year
    );
    setDsDoanhThuThang(duLieuDaSapXep);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching monthly revenue data:", error);
    toast.error("Lỗi khi lấy dữ liệu doanh thu tháng!");
  }
};

  const laySoLuongKhachHangMoi = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhang/khachhangthangmoi`);
      setSoLuongKhachHangMoi(response.data.tongSoKachhangmoi);
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng khách hàng mới:", error);
      toast.error("Lỗi khi lấy số lượng khách hàng mới!");
    }
  };

  const layDoanhThuHomNay = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/hoadon/DoanhThuHomNay`);
      setDoanhThuHomNay(response.data.tongDoanhThu);
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu hôm nay:", error);
      toast.error("Lỗi khi lấy doanh thu hôm nay!");
    }
  };

  const laySanPhamBanChay = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanphams/ban-chay`);
      setSanPhamBanChay(response.data);
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm bán chạy:", error);
      toast.error("Lỗi khi lấy dữ liệu sản phẩm bán chạy!");
    }
  };

  const layTongSanPhamTonKho = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanpham/TongSanPham`);
      setTongSanPhamTonKho(response.data.tongSanPham);
      setDangtai(false);
    } catch (error) {
      console.error("Lỗi khi lấy tổng sản phẩm tồn kho:", error);
      toast.error("Lỗi khi lấy tổng sản phẩm tồn kho!");
    }
  };

  useEffect(() => {
    layDoanhThuThang();
    laySoLuongKhachHangMoi();
    layDoanhThuHomNay();
    laySanPhamBanChay();
    layTongSanPhamTonKho();
  }, []);

  const dataLine = {
    labels: dsDoanhThuThang.map((muc) => `${muc.month}/${muc.year}`), // Tháng/Năm
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: dsDoanhThuThang.map((muc) => muc.totalRevenue), // Tổng doanh thu
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const dataBar = {
    labels: sanPhamBanChay.map((sp) => sp.tieude),
    datasets: [
      {
        label: 'Số lượng bán',
        data: sanPhamBanChay.map((sp) => sp.tong_so_luong),
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

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Lấy giá trị thô
            return `${value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 3,
            })}`;
          },
        },
      },
    },
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          
          <div className="container-fluid mt-3">
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
                    ) : (
                      <Line data={dataLine} options={options} />
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
                         <Card.Text>{`Tháng này có ${soLuongKhachHangMoi} khách hàng mới.`}</Card.Text>
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
                       <Card.Text>{`Doanh thu hôm nay đạt ${parseFloat(doanhThuHomNay).toLocaleString("vi-VN", { minimumFractionDigits: 3 })} VND.`}</Card.Text>
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
                          <Card.Text>{`Hiện tại có ${tongSanPhamTonKho} sản phẩm đang tồn kho.`}</Card.Text>
                          <Link to={'/admin/sanpham'} className="btn btn-light">Chi tiết</Link>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TrangChuAdmin;
