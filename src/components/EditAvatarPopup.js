import {useEffect, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import PopupWithFormInput from './PopupWithFormInput';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const [avatar, setAvatar] = useState('');

  function handleAvatarChange(evt) {
    setAvatar(evt.target.value);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatar);
  }

  useEffect(() => {
    if (isOpen) {
      setAvatar('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <PopupWithFormInput
        id="avatar"
        value={avatar}
        onChange={handleAvatarChange}
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
