import React, { useState } from "react";
import { uploadContent } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CreateContent = ({ uploadContent }) => {
  const date = new Date();
  const [formData, setFormData] = useState({
    videoUrl: "",
    tags: "",
    category: "",
    subCategory: "",
    name: "",
    desc: "",
    uloadDate: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  });
  const { videoUrl, tags, category, subCategory, name, desc } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {...formData, tags: tags.split(",")};
    console.log(data);
    uploadContent(data);
  };

  return (
    <div className="contnt-crtor-panel">
      <div className="content-board create">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <h1>Create Content</h1>
          <p>Here you can add Your Master Videos</p>
          <div className="inpt-group">
            <label>videoUrl</label>
            <input
              id="videoUrl"
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>tags</label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>category</label>
            <input
              id="category"
              type="text"
              name="category"
              value={category}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>subCategory</label>
            <input
              id="subCategory"
              type="text"
              name="subCategory"
              value={subCategory}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>desc</label>
            <input
              id="desc"
              type="text"
              name="desc"
              value={desc}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn big">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

CreateContent.propTypes = {
  content: PropTypes.object.isRequired,
  uploadContent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  uploadContent,
})(CreateContent);
