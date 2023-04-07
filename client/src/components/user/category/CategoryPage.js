import React, { useEffect } from "react";
import { getCategories } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CategoryPage = ({ getCategories, content: { categories } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className="category-page">
      <h1>Watch By Categories</h1>
      <div className="cat-grid">
        {categories?.map((itm) => (
          <Link to={`/videos/${itm.name}`} className="cat-itm" key={itm._id}>
            {itm.name}
          </Link>
        ))}
      </div>
      <h1>Watch By Sub-Categories</h1>
      <div className="cat-grid">
        {categories?.map((item) =>
          item?.subCategory.map((itm) => (
            <Link
              to={`/videos/${item.name}/${itm}`}
              className="cat-itm sub"
              key={itm._id}
            >
              {itm} <br />
              <div className="sub-prnt">{item.name}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

CategoryPage.propTypes = {
  content: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getCategories,
})(CategoryPage);
