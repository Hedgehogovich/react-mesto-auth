import {useContext, useEffect, useState} from 'react';

import PopupWithForm from './PopupWithForm';

import UiInput from './UiInput';

import CurrentUserContext from '../contexts/CurrentUserContext';
import {
  createMaxLengthValidationRule,
  createMinLengthValidationRule,
  createRequiredValidationRule,
  createValidationRulesObject
} from '../utils/validationRules';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const [controlledValues, setControlledValues] = useState({name: '', about: ''});

  function handleSubmit(formData) {
    onUpdateUser(formData);
  }

  useEffect(() => {
    if (currentUser) {
      setControlledValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser])

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isLoading={isLoading}
      isOpen={isOpen}
      controlledValues={controlledValues}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <UiInput
        id="name"
        name="name"
        type="text"
        validationRules={createValidationRulesObject(
          createRequiredValidationRule(),
          createMinLengthValidationRule(2),
          createMaxLengthValidationRule(40),
        )}
      />
      <UiInput
        id="about"
        name="about"
        type="text"
        validationRules={createValidationRulesObject(
          createRequiredValidationRule(),
          createMinLengthValidationRule(2),
          createMaxLengthValidationRule(200),
        )}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
