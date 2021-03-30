import {useContext} from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function HeaderAuthorizedMobileMenu({isOpened}) {
  const currentUser = useContext(CurrentUserContext);
  const menuClassName = 'header__menu header__menu_mobile'
    + (isOpened ? ' header__menu_mobile_opened' : '');

  return (
    <div className={menuClassName}>
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

export default HeaderAuthorizedMobileMenu;
