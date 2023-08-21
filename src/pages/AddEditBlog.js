import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { moderateContent } from "../utility/ContentModerate";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  comments: [],
  likes: [],
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user, setActive }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [imgAvail, setImgAvail] = useState(null);
  const [imgExist, setImgExist] = useState(null);
  const [file, setFile] = useState(null);
  const [isMic, setIsMic] = useState();

  // ---------- dictaphone  ------------//
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    setIsMic(false);
  }

  const listen = () => SpeechRecognition.startListening();
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    setText((prev) => prev + " " + transcript);
  }, [transcript]);
  // ---------- dictaphone ------------//

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending } = form;

  useEffect(() => {
    const uploadFile = () => {
      setImgAvail(false);
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          toast.info("Image upload to firebase successfully");
          setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
        });
        setTimeout(() => {
          setImgAvail(true);
        }, 2000);
      });
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setImgExist(true);
      let data = { ...snapshot.data() };
      const { description } = data;
      setText(description);
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (category && tags && title && text && trending) {
      // -------------------- //
      const titleFlagged = await moderateContent(title);
      const descriptionFlagged = await moderateContent(text);
      if (titleFlagged) {
        toast.error("Your title does not meet language standard");
        setLoading(false);
        return;
      }
      if (descriptionFlagged) {
        toast.error("Your description does not meet language standard");
        setLoading(false);
        return;
      }
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            description: text,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          setLoading(false);
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
          setLoading(false);
          toast.error("An error occured");
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            description: text,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          setLoading(false);
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
          setLoading(false);
          toast.error("An error occured");
        }
      }
      //  --------------------- //
    } else {
      setLoading(false);
      return toast.error("All fields are mandatory to fill");
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 ">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  required
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags eg. Mythology, Gaming, beauty"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                    id="radioOption1"
                  />
                  <label htmlFor="radioOption1" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                    id="radioOption2"
                  />
                  <label htmlFor="radioOption2" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  required
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  required
                  className="form-control description-box mb-1"
                  placeholder="Description"
                  value={text}
                  name="description"
                  onChange={(e) => setText(e.target.value)}
                />
                <p
                  title={listening ? "stop recording" : "start recording"}
                  className="btn btn-secondary fs-5 rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    margin: "0 auto",
                  }}
                >
                  {listening ? (
                    <i
                      className="bi bi-mic-mute-fill "
                      onClick={stopListening}
                    ></i>
                  ) : (
                    <i className="bi bi-mic-fill " onClick={listen}></i>
                  )}
                </p>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  required={id ? false : true}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {imgExist && (
                  <small>Image exist. Click if you wish to replace image</small>
                )}
              </div>
              <div className="col-12 py-3 text-center">
                {id ? (
                  <button
                    className="btn btn-add"
                    type="submit"
                    disabled={imgAvail === false || loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                ) : (
                  <button
                    className="btn btn-add"
                    type="submit"
                    disabled={imgAvail === false || loading}
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
