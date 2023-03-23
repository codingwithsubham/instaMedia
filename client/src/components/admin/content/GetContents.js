import React, { useEffect } from "react";
import { getContent } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const GetContents = ({ getContent, content: { contents } }) => {
  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <div className="contnt-crtor-panel">
      <div className="content-board get">
        <h1>Uploaded Contents</h1>
        <p>Here you can View Your Master Videos</p>
        <div className="cntnts">
          {contents?.map(
            (item, indx) =>
              item && (
                <div className="cntnt-itm" key={indx}>
                  <img
                    src={`https://img.youtube.com/vi/${
                      item.videoUrl?.split("=")[1]
                    }/mqdefault.jpg`}
                    alt=""
                  />
                  <h3 className="title">{item.name}</h3>
                  <p>{item.uloadDate}</p>
                  <h5>
                    {item.category} | {item.subCategory}
                  </h5>
                  <p className="desc">{item.desc}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

GetContents.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getContent,
})(GetContents);
