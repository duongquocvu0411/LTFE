import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2'; //để tạo biểu đồ cột và biểu đồ đường/mảng.
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
); //Đăng ký các module của thư viện chart.js để sử dụng các chức năng như vẽ biểu đồ, thang đo, tiêu đề, và các tùy chọn khác

const DanhThu = () => {
  // State để quản lý hiển thị biểu đồ
  const [showBarChart, setShowBarChart] = useState(true);

  // Dữ liệu giả lập cho biểu đồ cột (Bar chart)
  const barData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh thu (triệu VNĐ)',
        data: [120, 90, 140, 170, 200, 180],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu giả lập cho biểu đồ miền (Area chart)
  const areaData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Lợi nhuận (triệu VNĐ)',
        data: [80, 70, 110, 130, 160, 150],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  // Các tùy chọn của biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu và lợi nhuận',
      },
    },
  };

  // Hàm chuyển đổi giữa biểu đồ cột và miềns
  const toggleChart = () => {
    setShowBarChart((prevShowBarChart) => !prevShowBarChart);
  }; 
  //Hàm này được gọi khi người dùng nhấn vào nút chuyển đổi. Nó đảo ngược giá trị của showBarCharts, giúp chuyển đổi giữa hai loại biểu đồ.

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Báo cáo doanh thu và lợi nhuận</h2>
      
      {/* Nút chuyển đổi giữa hai loại biểu đồ */}
      <button className="btn btn-primary mb-3" onClick={toggleChart}>
        {showBarChart ? 'Hiển thị biểu đồ miền' : 'Hiển thị biểu đồ cột'}
      </button>

      {/* Hiển thị biểu đồ dựa trên trạng thái */}
      {showBarChart ? (
        <div >
          <h3>Biểu đồ cột - Doanh thu</h3>
          <Bar data={barData} options={options} />
        </div>
      ) : (
        <div>
          <h3>Biểu đồ miền - Lợi nhuận</h3>
          <Line data={areaData} options={options} />
        </div>
      )}
    </div>
  );
};

export default DanhThu;
