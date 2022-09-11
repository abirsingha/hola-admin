import React, {useContext, useEffect, useState} from "react";
import InfoText from "../UI/InfoText";
import Wrapper from "../UI/Wrapper";
import helpImg from "../../Assests/help.png";
import useInput from "../../hooks/use-input";
import AuthContext from "../../Store/AuthContext";
import { db } from "../../Store/firebase-config";
import { doc, setDoc, getDoc} from 'firebase/firestore';


const HelpTicket = () => {
  const items = localStorage.getItem("details");
  const itemsObj = JSON.parse(items);
  const email = itemsObj.email;
  const [message, setMessage] = useState("");

  const {
    value: enteredSubject,
    isValid: subjectIsValid,
    hasError: subjectHasError,
    valueChangeHandler: subjectChangeHandler,
    inputBlurHandler: subjectBlurHandler,
    reset: resetSubject,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(value => value.trim() !== '');

  const createTicket = async (data) => { 
    await setDoc(doc(db, 'Ticket', email), data);
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  const createTicketHandler = (event) => { 
    event.preventDefault();
    subjectBlurHandler();
    descriptionBlurHandler();
    if (!subjectIsValid && !descriptionIsValid) {
      return;
    }
    else {
      const ticketData = {
        subject: enteredSubject,
        description: enteredDescription
      }
      createTicket(ticketData);
      setMessage(true);
    }
    resetSubject();
    resetDescription();
  }

  return (
    <Wrapper>
      <div className="container-fluid">
          <div className="row">
              <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-5">
                  <InfoText text="Support Ticket" />
                  <div className="helpCont">
                      <div className="helpHead">
                          <h5>We are here to help, log your ticket for assistance</h5>
                          <img src={helpImg} className="img-fluid" />
                      </div>
                      <div className="helpBody">
                          <form onSubmit={createTicketHandler}>
                              <div className="input-wrap">
                              <input type="text" value={enteredSubject} onBlur={subjectBlurHandler} onChange={subjectChangeHandler} className="form-control" placeholder="Subject*" />
                                {subjectHasError && <p className="errorMsg">Enter a valid subject</p> }
                              </div>
                              <div className="input-wrap">
                              <textarea className="form-control" value={enteredDescription} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} placeholder="Description *"></textarea>
                                {descriptionHasError && <p className="errorMsg">Enter a valid description.</p>}
                              </div>
                              <div className="input-wrap">
                                <button type="submit" className="btn btn-default btn-small">Create Ticket</button>
                                {message && <p className="message">Ticket raised successfully. We will reach to you shortly.</p> }
                              </div>
                  
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Wrapper>
  )
}

export default HelpTicket;