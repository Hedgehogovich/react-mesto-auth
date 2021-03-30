import {useContext, useState} from 'react';

import HeaderUnauthorizedLink from './HeaderUnauthorizedLink';
import HeaderAuthorizedBlock from './HeaderAuthorizedBlock';
import HeaderLogo from './HeaderLogo';
import HeaderAuthorizedMobileMenu from './HeaderAuthorizedMobileMenu';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function handleMobileMenuToggle() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  return (
    <>
      {currentUser && <HeaderAuthorizedMobileMenu isOpened={isMobileMenuOpened}/>}
      <header className="header page__header">
        <HeaderLogo/>
        {
          currentUser
            ? <HeaderAuthorizedBlock
                isMobileMenuOpened={isMobileMenuOpened}
                onMenuToggle={handleMobileMenuToggle}
              />
            : <HeaderUnauthorizedLink/>
        }
      </header>
    </>
  );
}

export default Header;
