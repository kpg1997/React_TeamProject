import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { Formik } from "formik";
import * as Yup from "yup";
// import { Form, Icon, Input, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

// const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialId = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        id: initialId,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required("id is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            id: values.id,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.id);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h1 className="logintitle">Log In</h1>
            <form className="loginform" onSubmit={handleSubmit}>
              <form required>
                <input className="logininput"
                  id="id"
                  placeholder="   ID"
                  type="text"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.id && touched.id ? "text-input error" : "text-input"
                  }
                />
                {errors.id && touched.id && (
                  <div className="input-feedback">{errors.id}</div>
                )}
              </form>

              <form required>
                <input className="logininput"
                  id="password"
                  placeholder="   PASSWORD"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </form>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: "#ff0000bf",
                      fontSize: "0.7rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <div>
                <div className="loginbutton_con">
                  <button className="loginbutton"
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
