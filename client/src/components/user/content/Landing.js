import React, { useEffect } from "react";
import { getContent, getCategories } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeroSlider from "../../layout/HeroSlider";
import CategoryBuilder from "./CategoryBuilder";

const Landing = ({
  getContent,
  getCategories,
  content: { contents, categories },
}) => {
  useEffect(() => {
    getContent();
    getCategories();
  }, [getContent, getCategories]);

  return (
    <div className="landing-page">
      <div className="hero">
        <HeroSlider contents={contents} />
      </div>
      <div className="categories">
        <CategoryBuilder categories={categories} contents={contents} />
      </div>
    </div>
  );
};

Landing.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getContent,
  getCategories,
})(Landing);
