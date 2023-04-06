import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { isGreaterDate } from "../../functions/dateCompare";
import PaymentGateway from "../paymentGateway/PaymentGateway";

const SubsPage = ({ user, loadUser }) => {
  const [openPG, setOpenPG] = useState(false);
  const handleClose = () => {
    setOpenPG(false);
    loadUser();
  };
  return (
    <div className="subs-page">
      <div className="subs-dtls">
        {user?.subsEndDate ? (
          isGreaterDate(user?.subsEndDate) ? (
            `Your Subscription will be expired on ${user?.subsEndDate}`
          ) : (
            `Your subscription expired at ${user?.subsEndDate}`
          )
        ) : (
          <Fragment>
            You haven't Subscribed Yet!! Subscribe now and enjoy Unlimited
            Watching Experience.
            <br/>
            <button className="btn" onClick={() => setOpenPG(true)}>
              Subscribe Now
            </button>
            {openPG && (
              <PaymentGateway
                openPG={openPG}
                amnt={1}
                handleClose={handleClose}
              />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

SubsPage.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  loadUser,
})(SubsPage);
