import React from "react";

const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h5 className="mt-5 fs-6">{msg}</h5>
              ) : (
                <>
                  <div className="media-left w-auto m-0">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className="rounded-circle"
                      width="50px"
                    />
                  </div>
                  <div className="media-body">
                    <h3 className="text-start media-heading user_name">
                      {name} <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className="text-start">{body}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
