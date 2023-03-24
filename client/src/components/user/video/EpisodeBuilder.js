import React from "react";
import { Link } from "react-router-dom";

const EpisodeBuilder = ({item}) => {
  return (
    item.category === "series" && (
      <div className="cat-board">
        <h2 className="cat-title">Episodes</h2>
        <div className="cat-items-grid">
          {item.seriseData?.episodes?.map((ep, idx) => (
            <div className="cnt-itm" key={idx}>
              <img
                src={`https://img.youtube.com/vi/${
                  ep.url?.split("=")[1]
                }/mqdefault.jpg`}
                alt=""
              />
              <h3 className="title">Episode {idx + 1}</h3>
              <Link to={`/watch/${ep.url?.split("=")[1]}`} className="btn big">
                Watch Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default EpisodeBuilder;
