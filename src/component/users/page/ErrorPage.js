import React from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import { Link } from "react-router-dom";
const ErrorPage = () =>{
    return(
        <>
        <Tieude/>
<div>
  {/* Modal Search Starts*/}
  <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body d-flex align-items-center">
          <div className="input-group w-75 mx-auto d-flex">
            <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
            <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
  {/* Single Page Header start */}
  <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">404 Error</h1>
    <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item"><Link href="#">Home</Link></li>
      <li className="breadcrumb-item"><Link href="#">Pages</Link></li>
      <li className="breadcrumb-item active text-white">404</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* 404 Start */}
  <div className="container-fluid py-5">
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <i className="bi bi-exclamation-triangle display-1 text-secondary" />
          <h1 className="display-1">404</h1>
          <h1 className="mb-4">Page Not Found</h1>
          <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
          <Link className="btn border-secondary rounded-pill py-3 px-5" to="/">Go Back To Home</Link>
        </div>
      </div>
    </div>
  </div>
  {/* 404 End */}
</div>

        <Footerusers/>
        </>
    )
}
export default ErrorPage;