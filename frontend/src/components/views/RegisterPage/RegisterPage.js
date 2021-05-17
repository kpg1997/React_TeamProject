import React from "react";
import moment from "moment";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";

// import { Form, Input, Button } from "antd";
import { withRouter } from "react-router";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {


  console.log('props',props);


  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        nickname: "",
        id: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required("id is required"),
        nickname: Yup.string().required("NickName is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            id: values.id,
            nickname: values.nickname,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            console.log('response.payload',response.payload)
            if (response.payload.success) {
              props.history.push("/users/login");
            } else {
              alert(response.payload.errMsg);
            }
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
          <div className="app2">
            <h2>Sign up</h2>
            <form
              style={{ minWidth: "300px"}}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <form required label="id">
                <input style={{width:"100%",height:"45px"}}
                  id="id"
                  placeholder="ID"
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

              <form required label="NickName">
                <input  style={{width:"100%",height:"45px"}}
                  id="nickname"
                  placeholder="NICKNAME"
                  type="text"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.nickname && touched.nickname
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.nickname && touched.nickname && (
                  <div className="input-feedback">{errors.nickname}</div>
                )}
              </form>

              <form
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <input style={{width:"100%",height:"45px"}}
                  id="email"
                  placeholder="EMAIL"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </form>

              <form
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <input style={{width:"100%",height:"45px"}}
                  id="password"
                  placeholder="PASSWORD"
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

              <form required label="Confirm Password" hasFeedback>
                <input style={{width:"100%",height:"45px"}}
                  id="confirmPassword"
                  placeholder="CONFIRM PASSWORD"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </form>

              <form {...tailFormItemLayout} style={{textAlign:"center",padding:"5px"}}>
                <button className="loginbutton"
                style={{width:"200px", textAlign:"center"}}
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(RegisterPage);
