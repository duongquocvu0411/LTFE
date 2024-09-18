import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import ModlaAdddanhsachsanpham from '../modla/ModlaDanhsachsanpham';

const Danhsachsanpham = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 4;

  // Pagination logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  // Fetch profiles from API
  const fetchProfiles = () => {
    axios.get('http://127.0.0.1:8000/api/danhsachsanpham') // Update to your actual API endpoint
      .then(response => {
        setProfiles(response.data);
      })
      .catch(error => {
        console.log('Error fetching profiles:', error);
      });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Open modal for adding a new profile
  const handleAddProfile = () => {
    setIsEdit(false);
    setCurrentProfile(null);
    setShowModal(true);
  };

  // Open modal for editing a profile
  const handleEditProfile = (profile) => {
    setIsEdit(true);
    setCurrentProfile(profile);
    setShowModal(true);
  };

  // Delete a profile
  const handleDeleteProfile = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/danhsachsanpham/${id}`)
      .then(() => {
        window.alert('Profile deleted successfully');
        fetchProfiles(); // Refresh profile list
      })
      .catch(error => console.log('Error deleting profile:', error));
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Profile List</h1>
            <div className="text-end mb-3">
              <Button variant="primary" onClick={handleAddProfile}>
                <i className="bi bi-file-plus-fill"></i> Add Profile
              </Button>
            </div>

            {/* Profile Table */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfiles.map(profile => (
                    <tr key={profile.id}>
                      <td>{profile.name}</td>
                      
                      <td>
                        <Button variant="primary" onClick={() => handleEditProfile(profile)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDeleteProfile(profile.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                  <button className="page-link" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>«</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                  <button className="page-link" onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}>»</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Profile */}
      <ModlaAdddanhsachsanpham
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEdit={isEdit}
        product={currentProfile} // You might want to rename this prop to `profile` for clarity
        fetchProducts={fetchProfiles} // Rename this function accordingly
      />

      <Footer />
    </div>
  );
};

export default Danhsachsanpham;
