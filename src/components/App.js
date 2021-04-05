import {useState, useEffect} from 'react';
import {Switch} from 'react-router-dom';

import Header from './Header';
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
import CurrentUserEmailContext from '../contexts/CurrentUserEmailContext';

import {api} from '../utils/api';
import {authApi} from '../utils/authApi';
import {AUTH_STORAGE_TOKEN_KEY} from '../utils/utils';

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
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedPreviewCard, setSelectedPreviewCard] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

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
    setIsRequestSuccessful(true);
    setIsInfoTooltipOpen(true);
  }

  function handleRequestError() {
    setIsRequestSuccessful(false);
    setIsInfoTooltipOpen(true);
  }

  function authorizeUser() {
    const token = localStorage.getItem(AUTH_STORAGE_TOKEN_KEY);

    if (token) {
      authApi.getUser(token)
        .then(({data: {email}}) => setCurrentUserEmail(email))
        .catch(error => {
          localStorage.removeItem(AUTH_STORAGE_TOKEN_KEY);
          console.error(error);
        });
    }
  }

  function handleLogin(token) {
    localStorage.setItem(AUTH_STORAGE_TOKEN_KEY, token);
    authorizeUser();
  }

  function handleSignOut() {
    setCurrentUserEmail('');
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_TOKEN_KEY);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedPreviewCard(null);
    setCardToDelete(null);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    authorizeUser();
  }, [])

  useEffect(() => {
    if (currentUserEmail) {
      api.getAuthorizedUser()
        .then(setCurrentUser)
        .catch(console.error);

      api.getCards()
        .then(setCards)
        .catch(console.error);
    }
  }, [currentUserEmail]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentUserEmailContext.Provider value={currentUserEmail}>
          <div className="page__content">
            <Header onSignOut={handleSignOut} />
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
                onLogin={handleLogin}
                onError={handleRequestError}
                className="page__form"
              />
              <NotAuthorizedProtectedRoute
                component={Register}
                path="/sign-up"
                onRegistration={handleRegistrationSuccess}
                onError={handleRequestError}
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
            isSuccessful={isRequestSuccessful}
          />
        </CurrentUserEmailContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
