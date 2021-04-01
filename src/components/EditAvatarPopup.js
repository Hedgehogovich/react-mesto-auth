import PopupWithForm from './PopupWithForm';
import UiInput from './UiInput';

import {
  createRequiredValidationRule, createUrlValidationRule,
  createValidationRulesObject
} from '../utils/validationRules';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  function handleFormSubmit(formData) {
    onUpdateAvatar(formData);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <UiInput
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        validationRules={createValidationRulesObject(
          createRequiredValidationRule(),
          createUrlValidationRule()
        )}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
