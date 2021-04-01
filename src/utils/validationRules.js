export function createRequiredValidationRule() {
  return {required: 'Заполните это поле'};
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
      message: 'Введите URL-адрес',
    }
  };
}

export function createValidationRulesObject(...rules) {
  return rules.reduce((acc, rule) => {
    return {...acc, ...rule};
  }, {});
}
