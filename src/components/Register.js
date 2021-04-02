import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

import UiForm from './form/UiForm';
import UiInput from './form/UiInput';

import {
  createEmailValidationRule, createMinLengthValidationRule,
  createRequiredValidationRule,
  createValidationRulesObject
} from '../utils/validationRules';
import {FORM_DARK_THEME} from '../utils/utils';
import {authApi} from '../utils/authApi';

function Register({onRegistrationSuccess, onRegistrationFail}) {
  const [isRegisterRequestInProcess, setIsRegisterRequestInProcess] = useState(false);
  const {formState, register, trigger, handleSubmit, reset} = useForm({
    mode: 'onChange',
  })

  function handleFormSubmit(formData) {
    if (isRegisterRequestInProcess) {
      return;
    }

    setIsRegisterRequestInProcess(true);

    authApi.signUp(formData)
      .then(() => {
        reset();
        onRegistrationSuccess();
      })
      .catch(error => {
        console.error(error)
        onRegistrationFail();
      })
      .finally(() => setIsRegisterRequestInProcess(false));
  }

  useEffect(() => {
    trigger();
  }, [trigger])

  return (
    <main className="unauthorized-form page__form">
      <UiForm
        name="register"
        title="Регистрация"
        submitButtonText="Зарегистрироваться"
        loadingInProgressText="Подождите"
        isLoading={isRegisterRequestInProcess}
        formState={formState}
        register={register}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="unauthorized-form__form"
        theme={FORM_DARK_THEME}
      >
        <UiInput
          name="email"
          id="email"
          placeholder="Email"
          type="email"
          validationRules={createValidationRulesObject(
            createRequiredValidationRule(),
            createEmailValidationRule()
          )}
        />
        <UiInput
          name="password"
          id="password"
          type="password"
          placeholder="Пароль"
          validationRules={createValidationRulesObject(
            createRequiredValidationRule(),
            createMinLengthValidationRule(8),
          )}
        />
      </UiForm>
      <Link to="/sign-in" className="unauthorized-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}

export default Register;
