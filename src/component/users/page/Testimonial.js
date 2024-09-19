import React from "react";
import Tieude from "../HeaderUsers";
import Footerusers  from "../Footerusers";

const Testimonial = ()=>{
return(
    <>
    <Tieude/>
   <div>
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
    <h1 className="text-center text-white display-6">Testimonial</h1>
    <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item"><a href="#">Home</a></li>
      <li className="breadcrumb-item"><a href="#">Pages</a></li>
      <li className="breadcrumb-item active text-white">Testimonial</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* Tastimonial Start */}
  <div className="container-fluid testimonial py-5">
    <div className="container py-5">
      <div className="testimonial-header text-center">
        <h4 className="text-primary">Our Testimonial</h4>
        <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
      </div>
      <div className="owl-carousel testimonial-carousel">
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item img-border-radius bg-light rounded p-4">
          <div className="position-relative">
            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
            <div className="mb-4 pb-4 border-bottom border-secondary">
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="d-flex align-items-center flex-nowrap">
              <div className="bg-secondary rounded">
                <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{width: 100, height: 100}} alt />
              </div>
              <div className="ms-4 d-block">
                <h4 className="text-dark">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                  <i className="fas fa-star text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Tastimonial End */}
  {/* Footer Start */}
  <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
    <div className="container py-5">
      <div className="pb-4 mb-4" style={{borderBottom: '1px solid rgba(226, 175, 24, 0.5)'}}>
        <div className="row g-4">
          <div className="col-lg-3">
            <a href="#">
              <h1 className="text-primary mb-0">Fruitables</h1>
              <p className="text-secondary mb-0">Fresh products</p>
            </a>
          </div>
          <div className="col-lg-6">
            <div className="position-relative mx-auto">
              <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
              <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{top: 0, right: 0}}>Subscribe Now</button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-end pt-3">
              <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Why People Like us!</h4>
            <p className="mb-4">typesetting, remaining essentially unchanged. It was 
              popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
            <a href className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Shop Info</h4>
            <a className="btn-link" href>About Us</a>
            <a className="btn-link" href>Contact Us</a>
            <a className="btn-link" href>Privacy Policy</a>
            <a className="btn-link" href>Terms &amp; Condition</a>
            <a className="btn-link" href>Return Policy</a>
            <a className="btn-link" href>FAQs &amp; Help</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Account</h4>
            <a className="btn-link" href>My Account</a>
            <a className="btn-link" href>Shop details</a>
            <a className="btn-link" href>Shopping Cart</a>
            <a className="btn-link" href>Wishlist</a>
            <a className="btn-link" href>Order History</a>
            <a className="btn-link" href>International Orders</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Contact</h4>
            <p>Address: 1429 Netus Rd, NY 48247</p>
            <p>Email: Example@gmail.com</p>
            <p>Phone: +0123 4567 8910</p>
            <p>Payment Accepted</p>
            <img src="img/payment.png" className="img-fluid" alt />
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
export default Testimonial;