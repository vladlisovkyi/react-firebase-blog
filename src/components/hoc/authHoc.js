import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const authHoc = (Component, isAdmin = false) => {
  const AuthHoc = (props) => {
    const authCheck = () => {
      const auth = props.auth;

      if (auth.isAuth) {
        const role = auth.user.role;
        if (role === 1 && isAdmin) {
          return <Redirect to="/dashboard" />;
        }
        return <Component {...props} />;
      } else {
        return <Redirect to="/login" />;
      }
    };

    return authCheck();
  };

  const mapStateToProps = (state) => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(AuthHoc);
};

export default authHoc;
