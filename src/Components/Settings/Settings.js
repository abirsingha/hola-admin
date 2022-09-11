import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import InfoText from "../UI/InfoText";
import Wrapper from "../UI/Wrapper";
import useInput from "../../hooks/use-input";
import { db } from "../../Store/firebase-config";
import { doc, setDoc, getDoc} from 'firebase/firestore';

const Settings = () => {
  const authCtx = useContext(AuthContext);
  const items = localStorage.getItem("details");
  const itemsObj = JSON.parse(items);
  const token = itemsObj.token;
  const email = itemsObj.email;
  const currentPassword = itemsObj.password;
  const navigate = useNavigate("");
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const [profile, setProfile] = useState({});

  const {
    value: newPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword
  } = useInput(value => value.trim() !== '' && value.length >= 6);

  const {
    value: repeatPassword,
    isValid: repeatPasswordIsValid,
    hasError: repeatPasswordHasError,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
    reset: resetRepeatPassword
  } = useInput(value => value.trim() !== '' && value === newPassword);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(value => value.trim() !== '');

  const {
    typeNumber: mobileNumber,
    onlyNumberError: mobileNumberHasError,
    inputBlurHandler: mobileNumberBlurHandler,
    valueNumberHandler: mobileNumberChangeHandler,
    reset: resetMobileNumber
  } = useInput(value => value.trim() !== '');

  const {
    value: businessOwnerName,
    isValid: businessOwnerNameIsValid,
    hasError: businessOwnerNameHaserror,
    valueChangeHandler: businessOwnerNameChangeHandler,
    inputBlurHandler: businessOwnerNameBlurHandler,
    reset: resetBusinessOwnerName,
  } = useInput(value => value.trim() !== '');

  const {
    typeNumber: registrationNumber,
    onlyNumberError: registrationNumberHasError,
    inputBlurHandler: registrationNumberBlurHandler,
    valueNumberHandler: registrationNumberChangeHandler,
    reset: resetRegistrationNumber
  } = useInput(value => value.trim() !== '');

  const {
    value: businessName,
    isValid: businessNameIsValid,
    hasError: businessNameHaserror,
    valueChangeHandler: businessNameChangeHandler,
    inputBlurHandler: businessNameBlurHandler,
    reset: resetBusinessName,
  } = useInput(value => value.trim() !== '');

  const {
    value: personalAddress,
    isValid: personalAddressIsValid,
    hasError: personalAddressHaserror,
    valueChangeHandler: personalAddressChangeHandler,
    inputBlurHandler: personalAddressBlurHandler,
    reset: resetPersonalAddress,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredBusinessAddress,
    isValid: businessAddressIsValid,
    hasError: businessAddressHaserror,
    valueChangeHandler: businessAddressChangeHandler,
    inputBlurHandler: businessAddressBlurHandler,
    reset: resetBusinessAddress,
  } = useInput(value => value.trim() !== '');

  const {
    typeNumber: enteredFoundationYear,
    onlyNumberError: foundationYearHasError,
    inputBlurHandler: foundationYearBlurHandler,
    valueNumberHandler: foundationYearChangeHandler,
    reset: resetfoundationYear
  } = useInput(value => value.trim() !== '');

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  const createProfile = async (data) => { 
    await setDoc(doc(db, 'Usersprofile', email), data);
  }

  useEffect(() => { 
    const getProfile = async () => { 
      const getRef = doc(db, "Usersprofile", email);
      const docData = await getDoc(getRef);
      if (docData.exists()) {
        setProfile(docData.data());
        setDataExists(true);
      } else {
        console.log("No such document!");
        setDataExists(false);
      }
    }
    getProfile();
  }, [email])

  const saveProfileHandler = (event) => { 
    event.preventDefault();
    nameBlurHandler();
    mobileNumberBlurHandler();
    businessOwnerNameBlurHandler();
    registrationNumberBlurHandler();
    businessNameBlurHandler();
    personalAddressBlurHandler();
    businessNameBlurHandler();
    businessAddressBlurHandler();
    foundationYearBlurHandler();
    if (!enteredNameIsValid
      && !businessOwnerNameIsValid
      && !businessNameIsValid
      && !personalAddressIsValid
      && !businessAddressIsValid) {
      return;
    } else { 
      const profile = {
        name: enteredName,
        mobile: mobileNumber,
        businessOwner: businessOwnerName,
        registrationNumber: registrationNumber,
        businessName: businessName,
        personalAddress: personalAddress,
        businessAddress: enteredBusinessAddress,
        foundationYear: enteredFoundationYear
      }
      setMessage(<p className="message">Profile saved successfully!</p>)
      createProfile(profile);
      console.log(profile);
    }

    resetName();
    resetMobileNumber();
    resetBusinessOwnerName();
    resetRegistrationNumber();
    resetBusinessName();
    resetPersonalAddress();
    resetBusinessAddress();
    resetfoundationYear();
  }

  const changePasswordHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid && !repeatPasswordIsValid) {
      passwordBlurHandler();
      repeatPasswordBlurHandler();
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError(true);
      return;
    }
    if (newPassword !== repeatPassword) {
      repeatPasswordBlurHandler();
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAt9Z7e_sPZLqc0U-h4c20PRBXobKFlYs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: newPassword,
          returnSecureToken: false,
        }),
        header: {
          "Content/type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setMessage(
          <p className="message">
            Password has been changed successfully. Please login again.
          </p>
        );
        setTimeout(() => {
          authCtx.logout();
          navigate("/");
        }, 6000);
      } else {
        return res.json().then((data) => {
          if (data && data.error.message === "INVALID_ID_TOKEN") {
            setMessage(
              <p className="errorMsg">
                The user's credential is no longer valid. The user must sign in
                again.
              </p>
            );
          } else if (data && data.error.message === "TOKEN_EXPIRED") {
            setMessage(
              <p className="errorMsg already-chnage">
                You have already changed password. Login again to change
                password.
              </p>
            );
          }
        });
      }
    });

    setPasswordError(false);
    resetPassword();
    resetRepeatPassword();
  };
  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12">
                <InfoText text="Profile Setting" />
              </div>
            </div>
            <form onSubmit={saveProfileHandler}>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Name:</label>
                    <input type="text" value={enteredName} onBlur={nameBlurHandler} onChange={nameChangeHandler} className="form-control" />
                      {enteredNameHasError && <p className="errorMsg">Enter a valid name.</p>}
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" value={email} disabled className="form-control"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Mobile:</label>
                    <input type="text" value={mobileNumber} onChange={mobileNumberChangeHandler} onBlur={mobileNumberBlurHandler} className="form-control" />
                    {mobileNumberHasError && <p className="errorMsg">Enter a valid mobile number.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Business owner name:</label>
                    <input type="text" value={businessOwnerName} onChange={businessOwnerNameChangeHandler} onBlur={businessOwnerNameBlurHandler} className="form-control" />
                      {businessOwnerNameHaserror && <p className="errorMsg">Enter a valid Business owner name.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Registration number:</label>
                    <input type="text" onChange={registrationNumberChangeHandler} onBlur={registrationNumberBlurHandler} value={registrationNumber} className="form-control" />
                      {registrationNumberHasError && <p className="errorMsg">Enter a valid registration number.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Business name:</label>
                    <input type="text" value={businessName} onBlur={businessNameBlurHandler} onChange={businessNameChangeHandler} className="form-control" />
                      {businessNameHaserror && <p className="errorMsg">Enter a valid business name.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Personal address:</label>
                    <input type="text" value={personalAddress} onChange={personalAddressChangeHandler} onBlur={personalAddressBlurHandler} className="form-control" />
                      {personalAddressHaserror && <p className="errorMsg">Enter a valid personal address.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Business address:</label>
                    <input type="text" value={enteredBusinessAddress} onChange={businessAddressChangeHandler} onBlur={businessAddressBlurHandler} className="form-control" />
                      {businessAddressHaserror && <p className="errorMsg">Enter a valid business address.</p> }
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <label>Foundation year:</label>
                    <input type="text" value={enteredFoundationYear} onBlur={foundationYearBlurHandler} onChange={foundationYearChangeHandler} maxLength="4" className="form-control" />
                      {foundationYearHasError && <p className="errorMsg">Enter a valid foundation year.</p> }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <button type="subit" className="btn btn-default mt-0">
                      Save/Update
                    </button>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    {message}
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12">
                <InfoText text="Change Pasword" />
              </div>
            </div>
            <form onSubmit={changePasswordHandler}>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="New Password"
                        onChange={passwordChangeHandler}
                        value={newPassword}
                        className="form-control"
                      />
                      {passwordHasError && (
                        <p className="errorMsg">
                          Password must be six charecters long.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <div className="input-wrap">
                      <input
                        type="password"
                        placeholder="Repeat New Password"
                        onChange={repeatPasswordChangeHandler}
                        value={repeatPassword}
                        className="form-control"
                      />
                      {repeatPasswordHasError && (
                        <p className="errorMsg">
                          Repeat password must be same as password.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="form-group profile">
                    <button type="submit" className="btn btn-default mt-0">
                      Change Password
                    </button>
                    {passwordError && (
                      <p className="errorMsg same-password">
                        New password can't be same as current password. Try
                        another password.
                      </p>
                    )}
                    {message}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <div className="profile-info mb-3">
              {!dataExists && <p>Profile not save yet.</p>}
              {dataExists &&
                <ul>
                  <li><span>Name:</span>{profile.name}</li>
                  <li><span>Email:</span>{email}</li>
                  <li><span>Mobile:</span>{profile.mobile}</li>
                  <li><span>Business owner name:</span>{profile.businessOwner}</li>
                  <li><span>Registration number:</span>{profile.registrationNumber}</li>
                  <li><span>Business name:</span>{profile.businessName}</li>
                  <li><span>Personal address:</span>{profile.personalAddress}</li>
                  <li><span>Business address:</span>{profile.businessAddress}</li>
                  <li><span>Foundation year:</span>{profile.foundationYear}</li>
                </ul>
                }
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
