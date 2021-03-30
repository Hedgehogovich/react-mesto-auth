import {useState, useEffect} from 'react';

import PopupWithForm from './PopupWithForm';
import PopupWithFormInput from './PopupWithFormInput';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    onAddPlace({name, link});
  }

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <PopupWithFormInput
        id="place-name"
        value={name}
        onChange={handleNameChange}
        type="text"
        name="place-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <PopupWithFormInput
        id="picture"
        value={link}
        onChange={handleLinkChange}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
