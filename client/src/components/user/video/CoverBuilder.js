import React, { useState } from "react";
import { Link } from "react-router-dom";

const CoverBuilder = ({ item }) => {
  const [more, setMore] = useState(false);
  return (
    <div>
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
        {item.category !== "series" && (
          <Link
            to={`/watch/${item.videoUrl?.split("=")[1]}`}
            className="btn big"
          >
            Watch Now
          </Link>
        )}
      </div>
      <div className="content-desc">
        <h2>{item.name}</h2>
        <p>{item.uloadDate}</p>
        <h5 className="hero-desc">
          {item.category} | {item.subCategory}
        </h5>
        <p style={{ height: more ? "auto" : "103px", overflow: "hidden" }}>
          {item.desc}
        </p>
        <span onClick={() => setMore(!more)}
          style={{
            color: "blue",
            marginBottom: "10px",
            display: "block",
            marginTop: "-5px",
          }}
        >
          {more ? "less.." : "more.."}
        </span>
        <div className="hero-tags">
          {item?.tags?.map((x, i) => (
            <h5 key={i}>{x}</h5>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverBuilder;
