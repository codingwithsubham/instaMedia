import React, { useEffect } from "react";
import { getContent } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CategoryContent = ({ getContent, content: { contents }, match }) => {
  useEffect(() => {
    getContent();
  }, [getContent]);
  const cat = match.params.cat;
  const sub = match.params.sub;
  return (
    <div className="category-wise-content">
      <h1>
        {cat}
        {sub && " : " + sub}
      </h1>
      <div className="cntnts">
        {contents
          ?.filter((x) => x.category.toLowerCase() === cat && x.subCategory.toLowerCase() === sub)
          ?.map((item, indx) => (
            <div className="cntnt-itm" key={indx}>
              <div className="thumbnl">
                <img
                  src={`https://img.youtube.com/vi/${
                    item.videoUrl?.split("=")[1]
                  }/mqdefault.jpg`}
                  alt=""
                />
              </div>
              <div className="dtls">
                <h3 className="title">{item.name}</h3>
                <p>{item.uloadDate}</p>
                <h5>
                  {item.category} | {item.subCategory}
                </h5>
                <Link to={`/content/${item._id}`} className="btn big">Watch Now</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

CategoryContent.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getContent,
})(CategoryContent);
