import {useState, useEffect, useContext} from 'react';

import PopupWithForm from './PopupWithForm';
import PopupWithFormInput from './PopupWithFormInput';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({name, about});
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <PopupWithFormInput
        id="name"
        value={name}
        onChange={handleNameChange}
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="40"
      />
      <PopupWithFormInput
        id="about"
        value={about}
        onChange={handleDescriptionChange}
        name="about"
        type="text"
        required
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
