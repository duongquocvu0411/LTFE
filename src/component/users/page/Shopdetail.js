import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams for routing
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";

const ShopDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State to hold product data
const { addToCart } = useContext(CartContext);
  useEffect(() => {
    // Fetch product data from the API
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`); // Replace with your API URL
        const data = await response.json();
        setProduct(data); // Set the fetched product data
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]); // Fetch data when the component mounts or the id changes

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <>
      <div>
        <HeaderUsers />

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Shop Detail</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Shop Detail</li>
          </ol>
        </div>
        {/* Single Page Header End */}
        
        {/* Single Product Start */}
        <div className="container-fluid py-5 mt-5">
          <div className="container py-5">
            <div className="row g-4 mb-5">
              <div className="col-lg-8 col-xl-9">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="border rounded">
                      <a href="#">
                        <img  src={`http://127.0.0.1:8000/storage/${product.image}`} className="img-fluid rounded" alt={product.title} /> {/* Use product image */}
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{product.name}</h4>
                    <p className="mb-3">Category: {product.category}</p>
                    <h5 className="fw-bold mb-3">{product.price} $</h5>
                    <div className="d-flex mb-4">
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className={`fa fa-star ${index < product.rating ? 'text-secondary' : ''}`} />
                      ))}
                    </div>
                    <p className="mb-4">{product.description}</p>
                    
                    <button
                                  onClick={() => addToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary">
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </button>
                  </div>
                        <Link to="/shop" className="btn btn-primary">trở về</Link>
                  {/* Add the rest of the component code for reviews and other details here... */}

                </div>
              </div>

              {/* Add the sidebar or featured products as before... */}

            </div>
          </div>
        </div>
        {/* Single Product End */}
        <Footerusers />
      </div>
    </>
  );
}

export default ShopDetail;
