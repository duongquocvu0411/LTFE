
import React from "react";

const PageAdmin = () => 
{
    return(

        <>
        {/* ss */}
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
        </>
    )
}
export default PageAdmin