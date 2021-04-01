import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import PopupContainer from './PopupContainer';
import UiForm from './UiForm';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  children,
  controlledValues,
  submitButtonText = 'Сохранить'
}) {
  const {
    handleSubmit,
    trigger,
    reset,
    register,
    formState
  } = useForm({
    mode: 'onChange',
    ...(controlledValues ? {defaultValues: controlledValues} : {}),
  });

  useEffect(() => {
    if (isOpen) {
      trigger();
    } else {
      reset(controlledValues ? {...controlledValues} : undefined);
    }
  }, [trigger, reset, controlledValues, isOpen]);

  return (
    <PopupContainer
      isOpen={isOpen}
      popupName={`${name}-popup`}
      wrapperClassName="popup__container_form"
      onClose={onClose}
    >
      <UiForm
        name={name}
        title={title}
        register={register}
        formState={formState}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText={submitButtonText}
        isLoading={isLoading}
        loadingInProgressText="Сохранение..."
      >
        {children}
      </UiForm>
    </PopupContainer>
  );
}

export default PopupWithForm;
