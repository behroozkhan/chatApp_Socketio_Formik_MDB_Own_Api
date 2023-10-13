  /* eslint-disable react/no-unescaped-entities */
  import "mdb-react-ui-kit/dist/css/mdb.min.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
  } from "mdb-react-ui-kit";
  // import 'style.css';
  import { useFormik } from "formik";
  import {SignupSchema} from "../schemas/indexSch";
  import axios from "axios";
  import Swal from "sweetalert2";

  const initialValues = {
    email: "",
    password: "",
  };


  const Login = () => {
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        const userLoginObj = {
          email: values.email,
          password: values.password,
        };
        try {
          const response = await axios.post(
            "http://localhost:8000/api/user/login",
            userLoginObj
          );
          console.log("Response:", response.data);
          if (response.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Login successful",
              icon: "success",
            });
            action.resetForm();
          } else {
            if (response.status === 404) {
              Swal.fire({
                title: "Error",
                text: "API endpoint not found. Please check the URL.",
                icon: "error",
              });
            } else if (response.status === 500) {
              Swal.fire({
                title: "Error",
                text: "Internal server error. Please try again later.",
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "API call failed",
                icon: "error",
              });
            }
          }
        } catch (error) {
          console.log("error", error);
          Swal.fire({
            title: error.message,
            text: "Login failed",
            icon: "error",
          });
        }
      },
    });
    return (
      <div className="container">
        <MDBContainer fluid className="p-3 my-5 h-custom">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample-img"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="facebook-f" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="twitter" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="linkedin-in" />
                </MDBBtn>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <div className="email-container mb-3 w-75">
                <MDBInput
                  wrapperClass=""
                  label="Email address"
                  className="formControlLg"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  required
                />
                {errors.email && touched.email ? (
                  <span className="error-msg text-danger">{errors.email}*</span>
                ) : null}
              </div>
              <div className="pass-container w-75">
                <MDBInput
                  wrapperClass=""
                  label="Password"
                  className="formControlLg"
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  size="lg"
                  required
                />
                {errors.password && touched.password ? (
                  <span className="error-msg text-danger">
                    {errors.password}*
                  </span>
                ) : null}
              </div>

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <MDBBtn onClick={handleSubmit} className="w-25" type="submit">
                  Login
                </MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <a href="#!" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </MDBCol>
          </MDBRow>

          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>

            <div>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="facebook-f" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="twitter" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="google" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="linkedin-in" size="md" />
              </MDBBtn>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  };

  export default Login;
