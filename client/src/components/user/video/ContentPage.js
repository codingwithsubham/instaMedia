import React, { Fragment, useEffect, useState } from "react";
import { getContent } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ContentPage = ({ getContent, content: { contents }, match }) => {
  useEffect(() => {
    getContent();
  }, [getContent]);

 const [loadPlayer, setLoadPlayer] = useState(false);
 const handleClose = data => {
  setLoadPlayer(data);
 }

  return (
    <div className="watch-page">
      {contents
        ?.filter((x) => x._id === match.params.id)
        ?.map((item, indx) => (
          <Fragment key={indx}>
            <div
              className="hero-img insta-slide watch"
              style={{
                backgroundImage: `url('https://img.youtube.com/vi/${
                  item.videoUrl?.split("=")[1]
                }/hqdefault.jpg')`,
              }}
              alt=""
            >
              <h3 className="hero-title">{item.name}</h3>
              <p className="hero-date">{item.uloadDate}</p>
              <h5 className="hero-desc">
                {item.category} | {item.subCategory}
              </h5>
              <Link to={`/watch/${item.videoUrl?.split("=")[1]}`} className="btn big">Watch Now</Link>
            </div>
            <div className="content-desc">
              <h2>{item.name}</h2>
              <p>{item.uloadDate}</p>
              <h5 className="hero-desc">
                {item.category} | {item.subCategory}
              </h5>
              <p>{item.desc}</p>
              <div className="hero-tags">
                {item?.tags?.map((x, i) => (
                  <h5 key={i}>{x}</h5>
                ))}
              </div>
            </div>
            <div className="cat-board">
            <h2 className="cat-title">Related Picks</h2>
            <div className="cat-items-grid">
            {contents
              ?.filter((x) => x.category.toLowerCase() === item.category.toLowerCase())
              ?.map((cat, idx) => (
                <div className="cntnt-itm" key={idx}>
                  <img
                    src={`https://img.youtube.com/vi/${
                      cat.videoUrl?.split("=")[1]
                    }/mqdefault.jpg`}
                    alt=""
                  />
                  <h3 className="title">{cat.name}</h3>
                  <p>{cat.uloadDate}</p>
                  <h5>
                    {cat.category} | {cat.subCategory}
                  </h5>
                  <Link to={`/watch/${cat._id}`} className="btn big">Watch Now</Link>
                </div>
              ))}
            </div>
          </div>
          </Fragment>
        ))}
    </div>
  );
};

ContentPage.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, {
  getContent,
})(ContentPage);
