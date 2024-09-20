import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; //để tạo biểu đồ cột và biểu đồ đường/mảng.
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

 

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Báo cáo doanh thu và lợi nhuận</h2>
      
      {/* Hiển thị biểu đồ dựa trên trạng thái */}
     
        <div >
         
          <Bar data={barData} options={options} />
        </div>

    
    </div>
  );
};

export default DanhThu;
