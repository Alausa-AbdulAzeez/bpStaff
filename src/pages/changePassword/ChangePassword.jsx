import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./changePassword.scss";
import { BsEye, BsFillEyeSlashFill } from "react-icons/bs";
import { publicRequest } from "../../functions/requestMethods";
// import { login } from '../../redux/apiCalls'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/apiCalls";

const ChangePassword = () => {
  // MISCELLANEOUS
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { token } = useSelector((state) => state?.user?.currentUser?.data);
  console.log(token);

  const toastId = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value });
  };
  const setBtnState = () => {
    if (user.email && user.password) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // PASSWORD TOGGLE FUNCTIONALITY
  const [showPassword, setShowPassword] = useState(false);

  // FUNCTION FOR PASSWORD TOGGLE
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // END OF FUNCTION FOR PASSWORD TOGGLE

  // END OF PASSWORD TOGGLE FUNCTIONALITY

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleChangePassword = async (e) => {
    toastId.current = toast("Please Wait", {
      autoClose: 3000,
      isLoading: true,
    });

    console.log(user);
    e.preventDefault();
    try {
      if (user?.newPassword === user?.confirmPassword) {
        const res = await publicRequest
          .post("/Account/change-password", user, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            toast.update(toastId.current, {
              render:
                "Password updated succesfully! You'll be redirected in a bit, Please wait...",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });

            setTimeout(() => {
              navigate("/login");
            }, 2500);

            // setTimeout(() => {
            //   login(
            //     dispatch,
            //     { email: user?.username, password: user?.confirmPassword },
            //     navigate
            //   );
            // }, 2000);
          });
        console.log(res);
      } else {
        toast.error("Passwords don't match!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
    }

    // login(dispatch, user, navigate)
  };
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    setBtnState(user, setBtnDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ToastContainer />
      <div className="changePasswordWrapper">
        <div className="changePasswordWrapperRight">
          <form
            className="changePasswordFormWrapper"
            onSubmit={handleChangePassword}
          >
            <div className="changePasswordHeading">Change Password</div>
            <div className="changePasswordInputs">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="changePasswordEmailInput changePasswordInput"
                placeholder="example@****.com"
                data-testid="emailTestId"
                onChange={(e) => handleSetUser(e, "username")}
                required
              />

              <label htmlFor="">Old Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="changePasswordPasswordInput changePasswordInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "oldPassword")}
                  data-testid="passwordTestId"
                  required
                />
              </div>
              <label htmlFor="">New Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="changePasswordPasswordInput changePasswordInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "newPassword")}
                  data-testid="passwordTestId"
                  required
                />
              </div>
              <label htmlFor="">Confirm New Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="changePasswordPasswordInput changePasswordInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "confirmPassword")}
                  data-testid="passwordTestId"
                  required
                />
              </div>
              <div className="checkboxWrapper">
                <label htmlFor="">Show Passwords</label>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handlePasswordToggle}
                />
              </div>
            </div>

            <button
              className="changePasswordBtn"
              type={"submit"}
              data-testid="changePasswordBtn"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
