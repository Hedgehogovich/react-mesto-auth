import {useEffect} from 'react';

import {escapeButtonKey} from '../utils/utils';

function PopupContainer({
  isOpen,
  popupName,
  children,
  onClose,
  wrapperClassName,
  isBlackBackground = false,
}) {
  const backgroundClass = isBlackBackground ? ' popup_background_black' : ' popup_background_dark';
  const isOpenClass = isOpen ? ' popup_opened' : '';
  const rootClassName = `popup${backgroundClass} ${popupName}${isOpenClass}`;
  const popupWrapperClassName = `popup__container${wrapperClassName ? ` ${wrapperClassName}` : ''}`;

  function onBackgroundClick({target, currentTarget}) {
    if (target === currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function onKeyUp({key}) {
      if (key === escapeButtonKey) {
        onClose();
      }
    }

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onClose]);

  return (
    <div onClick={onBackgroundClick} className={rootClassName}>
      <div className={popupWrapperClassName}>
        {children}
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть всплывающее окно" />
      </div>
    </div>
  );
}

export default PopupContainer;
