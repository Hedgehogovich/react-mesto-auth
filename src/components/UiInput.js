function UiInput({
  register,
  name,
  id,
  isDirty,
  error,
  validationRules,
  className = '',
  ...restAttributes
}) {
  const inputClass = `edit-form__input${className ? ` ${className}` : ''}`
  const errorBlockClass = `edit-form__error${error && isDirty ? ' edit-form__error_visible' : ''}`;

  return (
    <label htmlFor={id} className="edit-form__field">
      <input
        ref={validationRules ? register(validationRules) : register}
        id={id}
        name={name}
        className={inputClass}
        aria-describedby={`${id}-error`}
        {...restAttributes}
      />
      <span id={`${id}-error`} className={errorBlockClass}>
        {error?.message}
      </span>
    </label>
  );
}

export default UiInput;
