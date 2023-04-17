import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SubCategoryBuilder = ({ categories, contents }) => {
  return (
    <Fragment>
      {categories?.map((cat, idx) =>
        cat.subCategory?.map((sub, indx) => (
          <Fragment key={idx + indx}>
            <div className="cat-board">
              <h2 className="cat-title">{sub} <span>{cat?.name}</span></h2>
              <div className="cat-items-grid">
                {contents
                  ?.filter(
                    (x) =>
                      x.category.toLowerCase() === cat?.name &&
                      x.subCategory.toLowerCase() === sub
                  )
                  ?.map((item, indx) => (
                    <div className="cnt-itm" key={indx}>
                      <img
                        src={`https://img.youtube.com/vi/${
                          item.videoUrl?.split("=")[1]
                        }/mqdefault.jpg`}
                        alt=""
                      />
                      <h3 className="title">{item.name}</h3>
                      <p>{item.uloadDate}</p>
                      <Link to={`/content/${item._id}`} className="btn big">
                        Watch Now
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </Fragment>
        ))
      )}
    </Fragment>
  );
};

export default SubCategoryBuilder;
