import React, { Fragment, useEffect, useState } from "react";

const HeroSlider = ({ contents }) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    counter > 0 &&
      counter < contents.length &&
      setTimeout(() => setCounter(counter - 1), 6000);
  }, [counter, contents.length]);

  if (counter === 0 && contents.length > 0) {
    setCounter(contents.length - 1);
  }
  return (
    <Fragment>
      {contents?.map(
        (item, indx) =>
          item &&
          counter === indx && (
            <Fragment key={indx}>
              <div
                className="hero-img insta-slide"
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
                <button className="btn big">Watch Now</button>
              </div>
            </Fragment>
          )
      )}
    </Fragment>
  );
};

export default HeroSlider;
