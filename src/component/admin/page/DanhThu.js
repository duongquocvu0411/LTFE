import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler } from 'chart.js'; // Import Filler plugin
import axios from "axios";
import { toast } from "react-toastify";
import ChiTietDoanhThuModal from "../modla/ChiTietDoanhThuModal";

import Sidebar from "../Sidebar";
import Footer from "../Footer";
import HeaderAdmin from "../HeaderAdmin";

// Register chart components, including the Filler plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler);

const BieuDoDoanhThu = () => {
  const [dsDoanhThuThang, setDsDoanhThuThang] = useState([]);
  const [thangDuocChon, setThangDuocChon] = useState(null);
  const [chiTietDoanhThu, setChiTietDoanhThu] = useState(null);
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chartType, setChartType] = useState('Bar');

  // Fetch monthly revenue data
  const layDoanhThuThang = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/revenue/monthly`);
      const sortedData = response.data.sort((a, b) => a.year === b.year ? a.month - b.month : a.year - b.year);
      setDsDoanhThuThang(sortedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu hàng tháng:", error);
      toast.error("Lỗi khi lấy dữ liệu doanh thu hàng tháng!");
    }
  };

  // Fetch detailed revenue data
  const layChiTietDoanhThu = async (nam, thang) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/doanhthu/${nam}/${thang}`);
      setChiTietDoanhThu(response.data);
      setHienThiModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết doanh thu:", error);
      toast.error("Lỗi khi lấy chi tiết doanh thu!");
    }
  };

  useEffect(() => {
    layDoanhThuThang();
  }, []);

  const duLieuBieuDo = {
    labels: dsDoanhThuThang.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: dsDoanhThuThang.map((item) => item.total_revenue),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true, // Filler plugin will handle this
      },
    ],
  };

  const tuyChonBieuDo = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chiSoCot = elements[0].index;
        const thangChon = dsDoanhThuThang[chiSoCot];
        setThangDuocChon(thangChon);
        layChiTietDoanhThu(thangChon.year, thangChon.month);
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin />

          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Biểu đồ doanh thu hàng tháng</h1>
            </div>

            {/* Content Row */}
            <div className="row">
              {/* Chart Column */}
              <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                  {/* Card Header */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Doanh thu</h6>
                    <div>
                      <button className="btn btn-primary me-2" onClick={() => setChartType('Bar')}>Biểu đồ cột</button>
                      <button className="btn btn-secondary" onClick={() => setChartType('Line')}>Biểu đồ miền</button>
                    </div>
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="chart-area" style={{ position: "relative", height: "50vh", width: "100%" }}>
                      {chartType === 'Bar' ? (
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
          {/* End of Page Content */}
        </div>
        <Footer />
      </div>

      {/* Modal Chi Tiết Doanh Thu */}
      <ChiTietDoanhThuModal
        show={hienThiModal}
        onHide={() => setHienThiModal(false)}
        thangDuocChon={thangDuocChon}
        chiTietDoanhThu={chiTietDoanhThu}
      />
    </div>
  );
};

export default BieuDoDoanhThu;
