import React from "react";
import { Link } from "react-router-dom";

const RelatedPicksBuilder = ({ contents, item }) => {
  return (
    <div className="cat-board">
      <h2 className="cat-title">Related Picks</h2>
      <div className="cat-items-grid">
        {contents
          ?.filter(
            (x) => x.category.toLowerCase() === item.category.toLowerCase()
          )
          ?.map((cat, idx) => (
            <div className="cnt-itm" key={idx}>
              <img
                src={`https://img.youtube.com/vi/${
                  cat.videoUrl?.split("=")[1]
                }/mqdefault.jpg`}
                alt=""
              />
              <h3 className="title">{cat.name}</h3>
              <p>{cat.uloadDate}</p>
              <Link to={`/content/${cat._id}`} className="btn big">
                Watch Now
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedPicksBuilder;
