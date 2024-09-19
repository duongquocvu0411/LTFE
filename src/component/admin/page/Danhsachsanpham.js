import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ModlaAdddanhsachsanpham from '../modla/ModlaDanhsachsanpham';
import { nanoid } from 'nanoid';

const Danhsachsanpham = () => {
  const [Danhsachsanphamss, setDanhsachsanphamss] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const DanhsachsanphamssPerPage = 4;

  // Pagination logic
  const indexOfLastDanhsachsanphams = currentPage * DanhsachsanphamssPerPage;
  const indexOfFirstDanhsachsanphams = indexOfLastDanhsachsanphams - DanhsachsanphamssPerPage;
  const currentDanhsachsanphamss = Danhsachsanphamss.slice(indexOfFirstDanhsachsanphams, indexOfLastDanhsachsanphams);
  const totalPages = Math.ceil(Danhsachsanphamss.length / DanhsachsanphamssPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDanhsachsanphams, setCurrentDanhsachsanphams] = useState(null);

  // Fetch Danhsachsanphamss from API
  const fetchDanhsachsanphamss = () => {
    axios.get('http://127.0.0.1:8000/api/danhsachsanpham')
      .then(response => {
        setDanhsachsanphamss(response.data);
      })
      .catch(error => {
        console.log('Error fetching Danhsachsanphamss:', error);
      });
  };

  useEffect(() => {
    fetchDanhsachsanphamss();
  }, []);

  // Open modal for adding a new Danhsachsanphams
  const handleAddDanhsachsanphams = () => {
    setIsEdit(false);
    setCurrentDanhsachsanphams(null);
    setShowModal(true);
  };

  // Open modal for editing a Danhsachsanphams
  const handleEditDanhsachsanphams = (Danhsachsanphams) => {
    setIsEdit(true);
    setCurrentDanhsachsanphams(Danhsachsanphams);
    setShowModal(true);
  };

  // Delete a Danhsachsanphamss
  const handleDeleteDanhsachsanphams = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/danhsachsanpham/${id}`)
      .then(() => {
        window.alert('Danhsachsanphams deleted successfully');
        fetchDanhsachsanphamss();
      })
      .catch(error => console.log('Error deleting Danhsachsanphams:', error));
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh mục sản phẩm</h1>
            <div className="text-end mb-3">
              <Button variant="primary" onClick={handleAddDanhsachsanphams}>
                <i className="bi bi-file-plus-fill">Add Danhsachsanphams</i>
              </Button>
            </div>

            {/* Danhsachsanphams Table */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDanhsachsanphamss.map((Danhsachsanphams, index) => (
                    <tr key={nanoid()}>
                      <td>
                      <p className='mb-0 mt-4'>{indexOfFirstDanhsachsanphams + index + 1}</p>
                      </td>
                      <td>
                      <p className="mb-0 mt-4">{Danhsachsanphams.name}</p>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEditDanhsachsanphams(Danhsachsanphams)}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteDanhsachsanphams(Danhsachsanphams.id)}
                        >
                          Delete
                        </Button>
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

      {/* Modal for Adding/Editing Danhsachsanphams */}
      <ModlaAdddanhsachsanpham
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEdit={isEdit}
        product={currentDanhsachsanphams}
        fetchProducts={fetchDanhsachsanphamss}
      />

      <Footer />
    </div>
  );
};

export default Danhsachsanpham;
