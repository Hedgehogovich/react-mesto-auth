import {Children, createElement} from 'react';
import FormThemeContext from '../../contexts/FormThemeContext';
import {FORM_WHITE_THEME} from '../../utils/utils';

function UiForm({
  children,
  register,
  name,
  title,
  submitButtonText,
  loadingInProgressText,
  isLoading,
  formState,
  onSubmit,
  className = '',
  theme = FORM_WHITE_THEME,
}) {
  const {errors, dirtyFields, isDirty} = formState || {};
  const isValid = !isDirty || (errors && !Object.keys(errors).length);
  const submitButtonClassName = `edit-form__submit edit-form__submit_theme_${theme}${isValid ? '' : ' edit-form__submit_disabled'}`;
  const formClassName = `edit-form edit-form_theme_${theme}${className ? ` ${className}` : ''}`;
  const formTitleClassName = `edit-form__title edit-form__title_theme_${theme}`;

  return (
    <form
      onSubmit={onSubmit}
      name={name}
      className={formClassName}
      noValidate
    >
      <h2 className={formTitleClassName}>
        {title}
      </h2>
      <FormThemeContext.Provider value={theme}>
        {Children.map(children, child => {
          return child.props.name
            ? createElement(child.type, {
              ...child.props,
              error: errors?.[child.props.name] || null,
              isDirty: dirtyFields?.[child.props.name] || null,
              key: child.props.name,
              register,
            })
            : child;
        })}
      </FormThemeContext.Provider>
      <button className={submitButtonClassName} disabled={!isValid || isLoading} type="submit">
        {isLoading ? loadingInProgressText : submitButtonText}
      </button>
    </form>
  );
}

export default UiForm;
