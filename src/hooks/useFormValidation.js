import {useEffect, useState, useRef} from 'react';

export function useFormValidation() {
  const ref = useRef();
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(callback) {
    return function (...args) {
      if (isValid) {
        callback(...args);
      }
    };
  }

  function checkValidity() {
    setIsValid(ref.current.checkValidity());
  }

  useEffect(() => {
    if (ref.current) {
      setIsValid(ref.current.checkValidity());
    }
  }, [ref]);

  return {
    ref,
    isValid,
    handleSubmit,
    checkValidity
  };
}
