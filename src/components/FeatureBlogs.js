import React from "react";
import { useNavigate } from "react-router-dom";
import { excerpt } from "../utility";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();
  !blogs && <h5>No blogs available</h5>
  return (
    
    
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">{title}</div>
      {blogs?.map((item) => (
        <div
          className="row pb-3"
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="col-4 align-self-center">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="most-popular-img"
            />
          </div>
          <div className="col-8 padding">
            <div className="text-start most-popular-font">
              {/* {item.title}   */}
                {excerpt(item.title, 23)}
              </div>
            <div className="text-start most-popular-font-meta">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>


          
          <div className="divide-holder">
            <div className="divide"></div>
          </div>
        </div>

      ))}
    </div>
  );
};

export default FeatureBlogs;
