import React from "react";
import { Link } from "react-router-dom";

const SeasonFinder = ({ item, contents }) => {
  const isTrailingData =
    item.isTrailingSeson &&
    contents.filter((y) => {
      return y._id === item.trailingId;
    });

  const hasTrailingData =
    isTrailingData.length > 0
      ? contents.filter((x) => {
          return x._id !== item._id && x.trailingId === item.trailingId;
        })
      : contents.filter((x) => {
          return x.trailingId === item._id;
        });

  const totalTrailingData =
    isTrailingData.length > 0
      ? isTrailingData.concat(hasTrailingData)
      : hasTrailingData;
  return (
    item.category === "series" && (
      <div className="cat-board">
        <h2 className="cat-title">Seasons</h2>
        <div className="cat-items-grid">
          {totalTrailingData.map((td, indx) => (
            <div className="cnt-itm" key={indx}>
              <img
                src={`https://img.youtube.com/vi/${
                  td.videoUrl?.split("=")[1]
                }/mqdefault.jpg`}
                alt=""
              />
              <h3 className="title">{td.name}</h3>
              <Link to={`/content/${td._id}`} className="btn big">
                Watch Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default SeasonFinder;
