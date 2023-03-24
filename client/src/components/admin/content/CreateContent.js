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
    isSeries: false,
    isTrailingSeson: false,
    trailingId: null,
    uloadDate: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  });
  const {
    videoUrl,
    tags,
    category,
    subCategory,
    name,
    desc,
    isSeries,
    isTrailingSeson,
    trailingId,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Progresive inputs
  const [inputFields, setInputFields] = useState([
    {
      url: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        url: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const onChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: tags.split(","),
      category: category.toLowerCase(),
      subCategory: subCategory.toLowerCase(),
      seriseData: { episodes: inputFields },
    };
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
          <div className="inpt-group-checkbox">
            <input
              id="isTrailingSeson"
              type="checkbox"
              name="isTrailingSeson"
              value={isTrailingSeson}
              defaultChecked={false}
              onChange={(e) =>
                setFormData({ ...formData, isTrailingSeson: !isTrailingSeson })
              }
            />
            <div id="checkbox-value">isTrailingSeson</div>
          </div>
          {isTrailingSeson && (
            <div className="inpt-group">
              <label>trailingId</label>
              <input
                id="trailingId"
                type="text"
                name="trailingId"
                value={trailingId}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
          <div className="inpt-group-checkbox">
            <input
              id="isSeries"
              type="checkbox"
              name="isSeries"
              value={isSeries}
              defaultChecked={false}
              onChange={(e) =>
                setFormData({ ...formData, isSeries: !isSeries })
              }
            />
            <div id="checkbox-value">isSeries</div>
          </div>
          {isSeries && (
            <div className="mult-inputs">
              {inputFields.map((data, index) => {
                const { url } = data;
                return (
                  <div className="row" key={index}>
                    <div className="inpt-group">
                      <label>Episode Url {index + 1}</label>
                      <input
                        id="url"
                        type="text"
                        name="url"
                        value={url}
                        onChange={(e) => onChange(index, e)}
                      />
                    </div>
                    <div
                      className="btn btn-outline-success "
                      onClick={addInputField}
                    >
                      +
                    </div>
                    <div
                      className="btn btn-outline-danger"
                      onClick={
                        inputFields.length !== 1 ? removeInputFields : ""
                      }
                    >
                      x
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
