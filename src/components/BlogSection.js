import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt, firstName } from "../utility";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row  py-3 shadow-sm my-3 mx-1 p-2" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img className="orient-img" src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{excerpt(title, 23)}</span>
            <span className="meta-info">
              <p className="author">{firstName(author)}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(description, 40)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                title="delete blog"
                style={{ margin: "15px", cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  title="edit blog"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
