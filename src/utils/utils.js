const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'edit-form__submit_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error_visible'
};

const editProfileButton = document.querySelector('.profile__edit');
const editProfileForm = document.querySelector('.profile-popup__form');

const addPlaceButton = document.querySelector('.profile__add');
const newPlaceForm = document.querySelector('.place-popup__form');

const avatarEditButton = document.querySelector('.profile__avatar-overlay');
const avatarEditForm = document.querySelector('.avatar-popup__form');

const escapeButtonKey = 'Escape';

export {
  validationConfig,
  editProfileButton,
  editProfileForm,
  addPlaceButton,
  newPlaceForm,
  avatarEditForm,
  avatarEditButton,
  escapeButtonKey
};
