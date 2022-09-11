import { useState } from "react";

const useInput = (validateValue) => { 
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState('');
  const [inputNumber, setInputNumber] = useState('');

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const validNumberError = !valueIsValid && !inputNumber && isTouched;

  const valueChangeHandler = (event) => { 
    setEnteredValue(event.target.value);
  }
  const inputBlurHandler = () => { 
    setIsTouched(true);
  }
  const valueNumberHandler = (event) => {
    const regEx = /^[0-9\b]+$/;
    if (event.target.value === '' || regEx.test(event.target.value)) {
      setInputNumber(event.target.value);
    }
  }
  const reset = () => { 
    setEnteredValue('');
    setIsTouched(false);
    setInputNumber('');
  }
  
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    onlyNumberError: validNumberError,
    typeNumber: inputNumber,
    valueChangeHandler,
    inputBlurHandler,
    valueNumberHandler,
    reset
  }
}

export default useInput;