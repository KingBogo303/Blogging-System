import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const { id } = useParams();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const userBlogQuery = query(blogRef, where("userId", "==", id));
    const docSnapshot = await getDocs(userBlogQuery);
    let userBlogs = [];
    docSnapshot.forEach((doc) => {
      userBlogs.push({ id: doc.id, ...doc.data() });
    });
    setUserBlogs(userBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getUserBlogs();
    // setActive(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        getUserBlogs();
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="blog-heading text-center py-2 mb-3">My Information</div>
      <form className="row g-3 mb-5">
        <div className="col-md-6">
          <label htmlFor="dName " className="form-label">
            Display Name
          </label>
          <input
            disabled
            type="text"
            className="form-control"
            defaultValue={user.displayName}
            id="dName"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email " className="form-label">
            Email
          </label>
          <input
            disabled
            type="email"
            className="form-control"
            defaultValue={user.email}
            id="email"
          />
        </div>
      </form>{" "}
      <div className="container">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-3">My Blogs</div>
          {userBlogs?.map((blog) => (
            <div key={blog.id}>
              <BlogSection
                user={user}
                handleDelete={handleDelete}
                {...blog}
                length={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
