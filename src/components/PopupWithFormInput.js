import {useEffect, useContext} from 'react';

import PopupOpenedContext from '../contexts/PopupOpenedContext';

import {useInputValidation} from '../hooks/useInputValidation';

function PopupWithFormInput({
  id,
  value,
  onChange,
  className = '',
  ...restAttributes
}) {
  const {
    ref,
    isTouched,
    errors,
    handleChange,
    resetInputValidation
  } = useInputValidation();
  const popupOpened = useContext(PopupOpenedContext);

  const inputClass = `edit-form__input${className ? ` ${className}` : ''}`
  const errorBlockClass = `edit-form__error${errors && isTouched ? ' edit-form__error_visible' : ''}`;

  useEffect(() => {
    if (!popupOpened) {
      resetInputValidation();
    }
  }, [popupOpened, resetInputValidation]);

  return (
    <label htmlFor={id} className="edit-form__field">
      <input
        ref={ref}
        id={id}
        value={value}
        onChange={handleChange(onChange)}
        className={inputClass}
        aria-describedby={`${id}-error`}
        {...restAttributes}
      />
      <span id={`${id}-error`} className={errorBlockClass}>
        {errors}
      </span>
    </label>
  );
}

export default PopupWithFormInput;
