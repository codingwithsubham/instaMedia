import React, { Fragment, useEffect } from "react";
import { getContent } from "../../../actions/content";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EpisodeBuilder from "./EpisodeBuilder";
import RelatedPicksBuilder from "./RelatedPicksBuilder";
import CoverBuilder from "./CoverBuilder";
import SeasonFinder from "./SeasonFinder";

const ContentPage = ({ getContent, content: { contents }, match }) => {
  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <div className="watch-page">
      {contents
        ?.filter((x) => x._id === match.params.id)
        ?.map((item, indx) => (
          <Fragment key={indx}>
            <CoverBuilder item={item} />
            <EpisodeBuilder item={item} />
            <SeasonFinder item={item} contents={contents} />
            <RelatedPicksBuilder contents={contents} item={item} />
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
