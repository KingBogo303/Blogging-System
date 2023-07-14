import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({ userId, userComment, setUserComment, error, handleComment }) => {
  const navigate = useNavigate();

  const [remainingWords, setRemainingWords] = useState();

  useEffect(() => {
    setRemainingWords(50 - (userComment.trim().length))
  }, [userComment])


  useEffect(() => { }, [])

  return (
    <>
      <form className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="form-control description"
          />
          {
            userComment.length < 50 ?
              (<small>{`Number of characters remaining: ${remainingWords}`}</small>) :
              ""
          }
        </div>
      </form>
      {!userId ? (
        <>
          <h5>Please login or Create an account to post comment</h5>
          <button className="btn btn-success" onClick={() => navigate("/auth")}>
            Login
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleComment}
          >
            Post Comment
          </button>
        </>
      )}
    </>
  );
};

export default CommentBox;
