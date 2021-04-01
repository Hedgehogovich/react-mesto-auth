import {Children, createElement} from 'react';

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
}) {
  const {errors, dirtyFields} = formState || {};
  const isValid = errors && !Object.keys(errors).length;
  const submitButtonClassName = `edit-form__submit${isValid ? '' : ' edit-form__submit_disabled'}`;

  return (
    <form
      onSubmit={onSubmit}
      name={name}
      className="edit-form"
      noValidate
    >
      <h2 className="edit-form__title">
        {title}
      </h2>
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
      <button className={submitButtonClassName} disabled={!isValid || isLoading} type="submit">
        {isLoading ? loadingInProgressText : submitButtonText}
      </button>
    </form>
  );
}

export default UiForm;
