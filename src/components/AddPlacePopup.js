import PopupWithForm from './PopupWithForm';
import UiInput from './UiInput';

import {
  createMaxLengthValidationRule,
  createMinLengthValidationRule,
  createRequiredValidationRule,
  createUrlValidationRule,
  createValidationRulesObject
} from '../utils/validationRules';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  function handleFormSubmit(formData) {
    onAddPlace(formData);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <UiInput
        id="place-name"
        name="name"
        type="text"
        placeholder="Название"
        validationRules={createValidationRulesObject(
          createRequiredValidationRule(),
          createMinLengthValidationRule(2),
          createMaxLengthValidationRule(30),
        )}
      />
      <UiInput
        id="picture"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        validationRules={createValidationRulesObject(
          createRequiredValidationRule(),
          createUrlValidationRule()
        )}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
