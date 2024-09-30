import React, { useEffect } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";

const Testimonial = () => {
  useEffect(() => {
    // Toggle the modal search when the component mounts
    document.getElementById("searchModal").classList.add("show");
  }, []);

  return (
    <>
      <Tieude />
      <div>

        {/* Giới thiệu Section Start */}
        <div className="container-fluid py-5">
          <div className="container">
            <h1 className="text-center text-primary mb-4">
              Câu chuyện thương hiệu
            </h1>
            <p className="lead text-center">
              Morning Fruit là đơn vị chuyên cung cấp trái cây tươi chất lượng
              cao, từ các nhà vườn trong nước và nhập khẩu. Sứ mệnh của chúng
              tôi là
            </p>
            <div className="row text-center mt-5">
              <div className="col-lg-6">
                <img
                  src={`${process.env.PUBLIC_URL}/img/best-product-1.jpg`}
                  className="img-fluid rounded mb-4"
                  alt="Trái cây"
                />
                <h4>Từ nông trại đến bàn ăn</h4>
                <p>
                  Hành trình của chúng tôi là mang đến sản phẩm tươi ngon và an
                  toàn, đảm bảo nguồn gốc và quy trình sản xuất chuẩn.
                </p>
              </div>
              <div className="col-lg-6">
                <img
                  src={`${process.env.PUBLIC_URL}/img/best-product-1.jpg`}
className="img-fluid rounded mb-4"
                  alt="Trái cây tươi"
                />
                <h4>Cam kết của chúng tôi</h4>
                <p>
                  Chúng tôi luôn cam kết chất lượng, nguồn gốc rõ ràng và quy
                  trình chăm sóc kỹ lưỡng để mang đến những sản phẩm tươi ngon
                  nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Giới thiệu Section End */}

        {/* Testimonial Section Start */}
        <div className="container-fluid testimonial py-5">
          <div className="container py-5">
            <div className="testimonial-header text-center">
              <h1 className="text-primary">
                Mang đến những rau củ và trái cây tươi cho bạn!!!
              </h1>
              <h1 className="display-5 mb-5 text-dark"></h1>
            </div>
            <div className="owl-carousel testimonial-carousel">
              <div className="testimonial-item img-border-radius bg-light rounded p-4">
                <div className="position-relative">
                  <i
                    className="fa fa-quote-right fa-2x text-secondary position-absolute"
                    style={{ bottom: 30, right: 0 }}
                  />
                  <div className="mb-4 pb-4 border-bottom border-secondary">
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s,
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                    <div className="bg-secondary rounded">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/testimonial-1.jpg`}
                        className="img-fluid rounded"
                        style={{ width: 100, height: 100 }}
                        alt="client"
                      />
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
              {/* More testimonials */}
            </div>
          </div>
        </div>
        {/* Testimonial Section End */}
      </div>
      <Footerusers />
    </>
  );
};
export default Testimonial;