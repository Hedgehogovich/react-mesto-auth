import {useEffect} from 'react';

import PopupContainer from './PopupContainer';

import PopupOpenedContext from '../contexts/PopupOpenedContext';

import {useFormValidation} from '../hooks/useFormValidation';

function PopupWithForm({
   name,
   title,
   isOpen,
   onClose,
   onSubmit,
   isLoading,
   children,
   submitButtonText = 'Сохранить'
}) {
  const {ref, isValid, handleSubmit, checkValidity} = useFormValidation();
  const submitButtonClassName = `edit-form__submit${isValid ? '' : ' edit-form__submit_disabled'}`;

  useEffect(() => {
    if (isOpen) {
      checkValidity();
    }
  }, [checkValidity, isOpen]);

  return (
    <PopupContainer
      isOpen={isOpen}
      popupName={`${name}-popup`}
      wrapperClassName="popup__container_form"
      onClose={onClose}
    >
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        onChange={checkValidity}
        name={name}
        className="edit-form"
        noValidate
      >
        <h2 className="edit-form__title">
          {title}
        </h2>
        <PopupOpenedContext.Provider value={isOpen}>
          {children}
        </PopupOpenedContext.Provider>
        <button className={submitButtonClassName} disabled={!isValid || isLoading} type="submit">
          {isLoading ? 'Сохранение...' : submitButtonText}
        </button>
      </form>
    </PopupContainer>
  );
}

export default PopupWithForm;
