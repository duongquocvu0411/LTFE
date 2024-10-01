import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import ModalDiaChiChiTiet from '../modla/ModlaDiachichitiet';


const DiaChiChiTiet = () => {
  const [diaChiDetails, setDiaChiDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const detailsPerPage = 4;
  
  // Pagination logic
  const indexOfLastDetail = currentPage * detailsPerPage;
  const indexOfFirstDetail = indexOfLastDetail - detailsPerPage;
  const currentDetails = diaChiDetails.slice(indexOfFirstDetail, indexOfLastDetail);
  const totalPages = Math.ceil(diaChiDetails.length / detailsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  
  // Fetch details from API
  const fetchDiaChiDetails = () => {
    axios.get('http://127.0.0.1:8000/api/diachichitiet')
      .then(response => {
        setDiaChiDetails(response.data);
      })
      .catch(error => {
        console.log('Error fetching details:', error);
      });
  };
  // hàm xóa diachi
  const handleXoaDiaChiChiTiet = (id) =>{
    
    axios.delete(`http://127.0.0.1:8000/api/diachichitiet/${id}`)
    .then(() => {
      window.alert('đã xóa địa chỉ và email thành công');
      fetchDiaChiDetails();
    })
    .catch(error => console.log('có lỗi khi xóa ',error));
  }
  useEffect(() => {
    fetchDiaChiDetails();
  }, []);
  
  // Open modal for adding new detail
  const handleAddDetail = () => {
    setIsEdit(false);
    setCurrentDetail(null);
    setShowModal(true);
  };
  
  // Open modal for editing detail
  const handleEditDetail = (detail) => {
    setIsEdit(true);
    setCurrentDetail(detail);
    setShowModal(true);
  };
  
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh Sách Địa Chỉ Chi Tiết</h1>
            <div className="text-end mb-3">
              <Button variant="primary" onClick={handleAddDetail}>
                <i className="bi bi-file-plus-fill"> Add Detail</i>
              </Button>
            </div>

            {/* Table for DiaChiChiTiet */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Email</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDetails.map((detail, index) => (
                    <tr key={nanoid()}>
                      <td>
                        <p className='mb-0 mt-4'>{indexOfFirstDetail + index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{detail.diachi}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{detail.email}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{detail.sdt}</p>
                      </td>
                      <td>
                        <Button
                          variant="primary me-2"
                          onClick={() => handleEditDetail(detail)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>{' '}
                        <Button
                          variant="primary me-2"
                          onClick={() => handleXoaDiaChiChiTiet(detail.id)}
                        >
                           <i class="bi bi-trash3-fill"></i>
                        </Button>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>«</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}>»</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Details */}
      <ModalDiaChiChiTiet
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEdit={isEdit}
        detail={currentDetail}
        fetchDetails={fetchDiaChiDetails}
      />

      <Footer />
    </div>
  );
};

export default DiaChiChiTiet;
