import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import { GoogleLogin } from "react-google-login";
import isEmpty from "lodash/isEmpty";

// Actions
import * as AuthActions from "../actions/authActions";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticate: false
    };
  }
  // LifeCycle Methods

  componentWillReceiveProps(nextProps) {
    const data = nextProps.userInfo;
    if (!isEmpty(data.userInfo)) {
      this.setState({
        isAuthenticated: data.isAuthenticated
      });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/lobby" />;
    }
    return (
      <div className="login-ctn">
        <div className="login-section">
          <p>Welcome to Happy Hour 🍻</p>
          <GoogleLogin
            onSuccess={this.props.AuthActions.googleLogin}
            onFailure={this.props.AuthActions.googleLogin}
            clientId={
              "403522828913-j3qnb4euutmbc4r4gr408q4ggvs1q10a.apps.googleusercontent.com"
            }
            className="login-btn"
          >
            <IoLogoGoogle size={"1.5em"} />
            <span>Login with Google</span>
          </GoogleLogin>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch)
  };
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
