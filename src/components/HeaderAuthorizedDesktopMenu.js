import {useContext} from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function HeaderAuthorizedDesktopMenu() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="header__menu header__menu_desktop">
      {/*todo: email*/}
      <p className="header__username">
        {currentUser?.name}
      </p>
      <button className="header__logout">
        Выйти
      </button>
    </div>
  );
}

export default HeaderAuthorizedDesktopMenu;
