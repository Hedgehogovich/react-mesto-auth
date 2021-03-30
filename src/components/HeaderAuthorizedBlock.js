import HeaderAuthorizedDesktopMenu from './HeaderAuthorizedDesktopMenu';

function HeaderAuthorizedBlock({isMobileMenuOpened, onMenuToggle}) {
  const buttonClassName = 'header__menu-toggle header__menu-toggle_mobile'
    + (isMobileMenuOpened ? ' header__menu-toggle_mobile_active' : '');

  return (
    <>
      <HeaderAuthorizedDesktopMenu />
      <button
        type="button"
        onClick={onMenuToggle}
        className={buttonClassName}
      />
    </>
  );
}

export default HeaderAuthorizedBlock;
