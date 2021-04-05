import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import UiForm from './form/UiForm';
import UiInput from './form/UiInput';

import {
  createEmailValidationRule,
  createRequiredValidationRule,
  createValidationRulesObject
} from '../utils/validationRules';
import {FORM_DARK_THEME} from '../utils/utils';
import {authApi} from '../utils/authApi';

function Login({className, onLogin, onError}) {
  const [isLoginRequestInProcess, setIsLoginRequestInProcess] = useState(false);
  const {formState, register, trigger, handleSubmit} = useForm({
    mode: 'onChange',
  })
  const mainClassName = `unauthorized-form${className ? ` ${className}` : ''}`;

  function handleFormSubmit(formData) {
    if (isLoginRequestInProcess) {
      return;
    }

    setIsLoginRequestInProcess(true);

    authApi.signIn(formData)
      .then(({token}) => {
        onLogin(token);
      })
      .catch(error => {
        console.error(error);
        onError();
      })
      .finally(() => setIsLoginRequestInProcess(false));
  }

  useEffect(() => {
    trigger();
  }, [trigger])

  return (
    <main className={mainClassName}>
      <UiForm
        name="login"
        title="Вход"
        submitButtonText="Войти"
        loadingInProgressText="Подождите"
        isLoading={isLoginRequestInProcess}
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
          )}
        />
      </UiForm>
    </main>
  );
}

export default Login;
