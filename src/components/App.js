import {useState, useEffect} from 'react';
import {Switch} from 'react-router-dom';

import Header from './header/Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeleteConfirmationPopup from './CardDeleteConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import NotAuthorizedProtectedRoute from './NotAuthorizedProtectedRoute';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import {api} from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlaceAdding, setIsPlaceAdding] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

  const [cardToDelete, setCardToDelete] = useState(null);
  const [isCardDeleting, setIsCardDeleting] = useState(false);

  const [isLikeRequestInProcess, setIsLikeRequestInProcess] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedPreviewCard, setSelectedPreviewCard] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedPreviewCard(card);
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
  }

  function handleUpdateUser(userData) {
    if (isProfileUpdating) {
      return;
    }

    setIsProfileUpdating(true);
    api.updateProfile(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsProfileUpdating(false));
  }

  function handleUpdateAvatar(avatar) {
    if (isAvatarUpdating) {
      return;
    }

    setIsAvatarUpdating(true);
    api.updateAvatar(avatar)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsAvatarUpdating(false));
  }

  function handleAddPlace(cardData) {
    if (isPlaceAdding) {
      return;
    }

    setIsPlaceAdding(true);

    api.addCard(cardData)
      .then(newCardData => {
        setCards(state => [newCardData, ...state]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsPlaceAdding(false));
  }

  function handleCardLike({card, isLiked}) {
    if (isLikeRequestInProcess) {
      return;
    }

    setIsLikeRequestInProcess(true);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(updatedCardData => {
        const {_id: cardId} = updatedCardData;

        setCards(state => {
          return state.map(stateCard => stateCard._id === cardId ? updatedCardData : stateCard);
        });
      })
      .catch(console.error)
      .finally(() => setIsLikeRequestInProcess(false));
  }

  function handleCardDeleteConfirmation() {
    if (isCardDeleting) {
      return;
    }

    setIsCardDeleting(true);

    const {_id: cardId} = cardToDelete;

    api.removeCard(cardId)
      .then(() => {
        setCards(state => {
          return state.filter(stateCard => stateCard._id !== cardId);
        });
        setCardToDelete(null);
      })
      .catch(console.error)
      .finally(() => setIsCardDeleting(false));
  }

  function handleRegistrationSuccess() {
    setIsRegistrationSuccessful(true);
    setIsInfoTooltipOpen(true);
  }

  function handleRegistrationFail() {
    setIsRegistrationSuccessful(false);
    setIsInfoTooltipOpen(true);
  }

  function handleLoginSuccess() {
    
  }

  function handleLoginFail() {
    setIsRegistrationSuccessful(false);
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedPreviewCard(null);
    setCardToDelete(null);
    setIsInfoTooltipOpen(false);
    setIsRegistrationSuccessful(null);
  }

  useEffect(() => {
    // api.getAuthorizedUserInfo()
    //   .then(setCurrentUser)
    //   .catch(console.error);

    // api.getCards()
    //   .then(setCards)
    //   .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header />
          <Switch>
            <ProtectedRoute
              component={Main}
              path="/"
              exact
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            />
            <NotAuthorizedProtectedRoute
              component={Login}
              path="/sign-in"
              className="page__form"
            />
            <NotAuthorizedProtectedRoute
              component={Register}
              path="/sign-up"
              onRegistrationSuccess={handleRegistrationSuccess}
              onRegistrationFail={handleRegistrationFail}
              className="page__form"
            />
          </Switch>
          {currentUser && <Footer />}
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isProfileUpdating}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isPlaceAdding}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isAvatarUpdating}
        />
        <CardDeleteConfirmationPopup
          isOpen={!!cardToDelete}
          onClose={closeAllPopups}
          onCardDeleteConfirmation={handleCardDeleteConfirmation}
          isLoading={isCardDeleting}
        />
        <ImagePopup
          card={selectedPreviewCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistrationSuccessful={isRegistrationSuccessful}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
