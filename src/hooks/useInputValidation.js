import {useState, useRef} from 'react';

export function useInputValidation() {
  const ref = useRef();

  const [errors, setErrors] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  function handleChange(callback) {
    return function (...args) {
      setIsTouched(true);
      setErrors(ref.current.validationMessage || '');

      callback(...args);
    }
  }

  function resetInputValidation() {
    setErrors('');
    setIsTouched(false);
  }

  return {
    ref,
    errors,
    isTouched,
    handleChange,
    resetInputValidation
  };
}
