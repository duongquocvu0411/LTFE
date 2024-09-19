import React, { useEffect, useState } from "react"
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";

const Cart=() =>{

    return(
        <>
        <div>
            <Tieude/>
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
  {/* Modal Search Ends */}
  {/* Single Page Header start */}
  <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">Cart</h1>
    <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item"><a href="#">Home</a></li>
      <li className="breadcrumb-item"><a href="#">Pages</a></li>
      <li className="breadcrumb-item active text-white">Cart</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* Cart Page Start */}
  <div className="container-fluid py-5">
    <div className="container py-5">
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Products</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
      </div>
      <div className="mt-5">
        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
      </div>
      <div className="row g-4 justify-content-end">
        <div className="col-8" />
        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
          <div className="bg-light rounded">
            <div className="p-4">
              <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0 me-4">Subtotal:</h5>
                <p className="mb-0">$0</p>
              </div>
              <div className="d-flex justify-content-between">
                <h5 className="mb-0 me-4">Shipping</h5>
                <div className>
                  <p className="mb-0">Flat rate: $0</p>
                </div>
              </div>
              
            </div>
            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
              <h5 className="mb-0 ps-4 me-4">Total</h5>
              <p className="mb-0 pe-4">$0</p>
            </div>
            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Footerusers/>
        </>
    )
}
export default Cart;


