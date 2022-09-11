import React, { useEffect, useState } from "react";
import InfoText from "../UI/InfoText";
import Wrapper from "../UI/Wrapper";
import Input from "../UI/Input";
import BusinessCard from "./BusinessCard";
import { db } from "../../Store/firebase-config";
import { doc, setDoc, getDoc} from 'firebase/firestore';

const BusinessPlanContent = () => {
  const items = localStorage.getItem('details');
  const itemsObj = JSON.parse(items);
  const emailId = itemsObj.email;
  const [dataExists, setDataExists] = useState(false);
  const [businessPlan, setBusinessPlan] = useState({});
  //const businessCollection = collection(db, 'Businessplan');
  const [companyName, setCompanyName] = useState("");
  const [companyNameIsTouched, setCompanyNameIsTouched] = useState(false);
  const [date, setDate] = useState("");
  const [dateIsTouched, setDateIsTouched] = useState(false);
  const [forCompanyName, setForCompanyName] = useState("");
  const [forNameIsTouched, setForNameIsTouched] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddressIsTouched, setStreetAddressIsTouched] = useState(false);
  const [city, setCity] = useState("");
  const [cityIsTouched, setCityIsTouched] = useState(false);
  const [state, setState] = useState("");
  const [stateIsTouched, setStateIsTouched] = useState(false);
  const [zip, setZip] = useState("");
  const [zipIsTouched, setzipIsTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneIsTouched, setphoneIsTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [website, setWebsite] = useState("");
  const [websiteIsTouched, setWebsiteIsTouched] = useState(false);

  const companyNameIsValid = companyName.trim() !== "";
  const companyNameIsInvalid = !companyNameIsValid && companyNameIsTouched;
  const dateIsValid = date.trim() !== "";
  const dateIsInvalid = !dateIsValid && dateIsTouched;
  const forCompanyNameIsValid = forCompanyName.trim() !== "";
  const forCompanyNameIsInvalid = !forCompanyNameIsValid && forNameIsTouched;
  const streetAddressIsValid = streetAddress.trim() !== "";
  const streetAddressIsInvalid =
    !streetAddressIsValid && streetAddressIsTouched;
  const cityIsValid = city.trim() !== "";
  const cityIsInvalid = !cityIsValid && cityIsTouched;
  const stateIsValid = state.trim() !== "";
  const stateIsInvalid = !stateIsValid && stateIsTouched;
  const zipIsValid = zip.trim() !== "";
  const zipIsInvalid = !zipIsValid && zipIsTouched;
  const phoneIsValid = phone.trim() !== "";
  const phoneIsInvalid = !phoneIsValid && phoneIsTouched;
  const emailIsValid = email.trim() !== "" && email.includes("@");
  const emailIsInvalid = !emailIsValid && emailIsTouched;
  const websiteIsValid = website.trim() !== "" && website.includes(".");
  const websiteIsInvalid = !websiteIsValid && websiteIsTouched;

  const companyNameChangeHandler = (event) => {
    setCompanyName(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const forCompanyNameChangeHandler = (event) => {
    setForCompanyName(event.target.value);
  };
  const streetAddressChangeHandler = (event) => {
    setStreetAddress(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };
  const zipChangeHandler = (event) => {
    setZip(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const websiteChangeHandler = (event) => {
    setWebsite(event.target.value);
  };

  const createBusinessPlan = async (business) => {
    await setDoc(doc(db, 'Businessplan', emailId), business);
  }

  useEffect(() => { 
    const getBusinessPlan = async () => { 
      const getRef = doc(db, "Businessplan", emailId);
      const docData = await getDoc(getRef);
      if (docData.exists()) {
        setBusinessPlan(docData.data());
        setDataExists(true);
      } else {
        console.log("No such document!");
        setDataExists(false);
      }
    }
    getBusinessPlan();
  }, [emailId])
  
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setCompanyNameIsTouched(true);
    setDateIsTouched(true);
    setForNameIsTouched(true);
    setStreetAddressIsTouched(true);
    setCityIsTouched(true);
    setStateIsTouched(true);
    setzipIsTouched(true);
    setphoneIsTouched(true);
    setEmailIsTouched(true);
    setWebsiteIsTouched(true);
    if (
      !companyNameIsValid ||
      !dateIsValid ||
      !forCompanyNameIsValid ||
      !streetAddressIsValid ||
      !cityIsValid ||
      !zipIsValid ||
      !phoneIsValid ||
      !emailIsValid ||
      !websiteIsValid
    ) {
      return;
    }

    let data = {
      companyname: companyName,
      companydate: date,
      forcompany: forCompanyName,
      streetaddress: streetAddress,
      zip: zip,
      phone: phone,
      email: email,
      website: website,
    };
    createBusinessPlan(data);

    setCompanyName("");
    setDate("");
    setForCompanyName("");
    setStreetAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setEmail("");
    setWebsite("");
    setCompanyNameIsTouched(false);
    setDateIsTouched(false);
    setForNameIsTouched(false);
    setStreetAddressIsTouched(false);
    setCityIsTouched(false);
    setStateIsTouched(false);
    setzipIsTouched(false);
    setphoneIsTouched(false);
    setEmailIsTouched(false);
    setWebsiteIsTouched(false);
  };

  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4">
            <div className="infoText">
              <InfoText text="Cover page information" />
            </div>
            <div className="businessPlanWrap">
              <form onSubmit={formSubmitHandler}>
                <div className="input-wrap">
                  <Input
                    type="text"
                    value={companyName}
                    onChange={companyNameChangeHandler}
                    placeholder="Your company name"
                  />
                  {companyNameIsInvalid && (
                    <p className="errorMsg">
                      Please enter a valid company name
                    </p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    type="date"
                    value={date}
                    onChange={dateChangeHandler}
                    placeholder="Date"
                  />
                  {dateIsInvalid && (
                    <p className="errorMsg">Date should not empty.</p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    type="text"
                    value={forCompanyName}
                    onChange={forCompanyNameChangeHandler}
                    placeholder="For: Company name"
                  />
                  {forCompanyNameIsInvalid && (
                    <p className="errorMsg">
                      Please enter a valid company name.
                    </p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    onChange={streetAddressChangeHandler}
                    value={streetAddress}
                    type="text"
                    placeholder="Street address"
                  />
                  {streetAddressIsInvalid && (
                    <p className="errorMsg">
                      Please enter a valid street address.
                    </p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    type="text"
                    onChange={cityChangeHandler}
                    value={city}
                    placeholder="City"
                  />
                  {cityIsInvalid && (
                    <p className="errorMsg">Please enter a valid city.</p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    type="text"
                    onChange={stateChangeHandler}
                    value={state}
                    placeholder="State/Province"
                  />
                  {stateIsInvalid && (
                    <p className="errorMsg">Please enter a valid state.</p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    onChange={zipChangeHandler}
                    value={zip}
                    type="text"
                    placeholder="ZIP Code"
                  />
                  {zipIsInvalid && (
                    <p className="errorMsg">Please enter a valid ZIP.</p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    onChange={phoneChangeHandler}
                    value={phone}
                    type="text"
                    placeholder="Phone"
                  />
                  {phoneIsInvalid && (
                    <p className="errorMsg">
                      Please enter a valid phone number.
                    </p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    onChange={emailChangeHandler}
                    value={email}
                    type="email"
                    placeholder="Email"
                  />
                  {emailIsInvalid && (
                    <p className="errorMsg">Please enter a valid email.</p>
                  )}
                </div>
                <div className="input-wrap">
                  <Input
                    onChange={websiteChangeHandler}
                    value={website}
                    type="text"
                    placeholder="Website (Optional)"
                  />
                  {websiteIsInvalid && (
                    <p className="errorMsg">Please enter a valid website.</p>
                  )}
                </div>
                <div className="form-group">
                  <button type="submit" id="frmSave">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 offset-lg-2 col-xl-4 offset-xl-4">
            <div className="businessPlanCont">
              {!dataExists && <p>No Business Found!</p>}
              {dataExists && <BusinessCard name={businessPlan.companyname} plan="Business Plan" key={businessPlan.id} date={businessPlan.companydate} forname={businessPlan.companyname} street={businessPlan.address} city="California" state={businessPlan.streetaddress} zip={businessPlan.zip} phone={businessPlan.phone} email={businessPlan.email} website={businessPlan.website} />}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BusinessPlanContent;
