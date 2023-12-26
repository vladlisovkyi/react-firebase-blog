import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../store/actions";
import prevent from "../hoc/prevent";
import { toast } from "react-toastify";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const initialFormData = {
    name: "",
    lastname: "",
    password: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormType = () => {
    setRegister((prevRegister) => !prevRegister);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const authAction = register ? registerUser : loginUser;

    dispatch(authAction(formData))
      .then(({ payload }) => handleRedirection(payload))
      .catch((error) => {
        setLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const handleRedirection = (result) => {
    setLoading(false);

    if (result.error) {
      toast.error(result.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      history.push("/dashboard");
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formTitle = register ? "Register" : "Sign in";

  return (
    <>
      <div className="container login-wrapper">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">{formTitle}</h1>

          {register ? (
            <>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control mb-3"
                placeholder="Your name"
                onChange={handleInputs}
                value={formData.name}
              />

              <input
                type="text"
                id="lastname"
                name="lastname"
                className="form-control mb-3"
                placeholder="Your lastname"
                onChange={handleInputs}
                value={formData.lastname}
              />
            </>
          ) : null}

          <input
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email address"
            onChange={handleInputs}
            value={formData.email}
          />

          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleInputs}
            value={formData.password}
          />

          <br />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            {formTitle}
          </button>

          <div className="mt-3">
            {register ? "Need to sign in" : "Not registered"} ? click
            <span className="login_type_btn" onClick={handleFormType}>
              {" "}
              here{" "}
            </span>
            to {register ? "Sign in" : "Register"}
          </div>
        </form>
      </div>
    </>
  );
};

export default prevent(Login);
