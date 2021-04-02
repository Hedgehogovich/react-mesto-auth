export function createRequiredValidationRule() {
  return {required: 'Заполните это поле'};
}

export function createEmailValidationRule() {
  return {
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Введите Email.'
    }
  }
}

export function createMinLengthValidationRule(minLength) {
  return {
    minLength: {
      value: minLength,
      message: `Символов должно быть как минимум ${minLength}.`
    }
  };
}

export function createMaxLengthValidationRule(maxLength) {
  return {
    maxLength: {
      value: maxLength,
      message: `Символов должно быть не более ${maxLength}.`,
    }
  };
}

export function createUrlValidationRule() {
  return {
    pattern: {
      value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      message: 'Введите URL-адрес.',
    }
  };
}

export function createValidationRulesObject(...rules) {
  return rules.reduce((acc, rule) => {
    return {...acc, ...rule};
  }, {});
}
