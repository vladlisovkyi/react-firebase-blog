import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const prevent = (Component) => {
  const Prevent = (props) => {
    return props.auth.isAuth ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    );
  };

  const mapStateToProps = (state) => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(Prevent);
};

export default prevent;
