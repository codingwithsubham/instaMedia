import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

const CategoryBuilder = ({ categories, contents }) => {
  return (
    <Fragment>
      {categories?.map((cat, idx) => (
        <Fragment key={idx}>
          <div className="cat-board">
            <h2 className="cat-title">{cat.name}</h2>
            <div className="cat-items-grid">
            {contents
              ?.filter((x) => x.category.toLowerCase() === cat?.name)
              ?.map((item, indx) => (
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
                  <Link to={`/watch/${item._id}`} className="btn big">Watch Now</Link>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default CategoryBuilder;
