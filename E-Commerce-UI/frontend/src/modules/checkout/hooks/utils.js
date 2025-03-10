export const cardTypes = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  AMEX: 'AMEX',
  MAESTRO: 'MAESTRO',
  RUPAY: 'RUPAY'
};

export const variableMonthValidator =
  /^(([0-1])|(0[1-9]|1[0-2])|(0[1-9]|1[0-2])\s|(0[1-9]|1[0-2])\s\/|(0[1-9]|1[0-2])\s\/\s|(0[1-9]|1[0-2])\s\/\s[2-3]|(0[1-9]|1[0-2])\s\/\s[2-3][0-9])$/;
export const variableCardNumberValidator = /^[0-9\s]*$/;
export const variableCVVMatcher = /^[0-9]{1,3}$/;

export const getCardType = (cardNumumber) => {
  if (!luhnCheck(cardNumumber)) {
    return '';
  }
  const cardNum = cardNumumber.replace(/\D/g, '');
  let payCardType = '';
  const regexMap = [
    { regEx: /^4[0-9]{5}/gi, cardType: cardTypes.VISA },
    { regEx: /^5[1-5][0-9]{4}/gi, cardType: cardTypes.MASTERCARD },
    { regEx: /^3[47][0-9]{3}/gi, cardType: cardTypes.AMEX },
    { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: cardTypes.MAESTRO }
  ];
  for (let j = 0; j < regexMap.length; j += 1) {
    if (cardNum.match(regexMap[j].regEx)) {
      payCardType = regexMap[j].cardType;
      break;
    }
  }
  if (
    cardNum.indexOf('50') === 0 ||
    cardNum.indexOf('60') === 0 ||
    cardNum.indexOf('65') === 0
  ) {
    const g = '508500-508999|606985-607984|608001-608500|652150-653149';
    const i = g.split('|');
    for (let d = 0; d < i.length; d += 1) {
      const c = parseInt(i[d].split('-')[0], 10);
      const f = parseInt(i[d].split('-')[1], 10);
      if (
        cardNum.substr(0, 6) >= c &&
        cardNum.substr(0, 6) <= f &&
        cardNum.length >= 6
      ) {
        payCardType = cardTypes.RUPAY;
        break;
      }
    }
  }
  return payCardType;
};

const luhnCheck = (cardNum) => {
  const numericDashRegex = /^[\d\-\s]+$/;
  if (!numericDashRegex.test(cardNum)) return false;

  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  const strippedField = cardNum.replace(/\D/g, '');

  for (let n = strippedField.length - 1; n >= 0; n -= 1) {
    const cDigit = strippedField.charAt(n);
    nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

export const isValidCvv = (value) => {
  if (value === undefined || value === null) return false;

  if (value === '') return true;

  return variableCVVMatcher.test(value);
};

export const getMonthInMMFormat = (month) => {
  if (typeof month === 'number') {
    return month < 10 ? `0${month}` : `${month}`;
  }
  return month;
};

export const getYearInYYFormat = (year) => {
  const y = `${year}`;
  return y.substring(y.length - 2);
};

export const getMonthAndYear = (date) => {
  if (!date) return {};

  const d = date instanceof Date ? date : new Date(Date.parse(date));

  const month = getMonthInMMFormat(d.getMonth() + 1);
  const year = getYearInYYFormat(d.getUTCFullYear());

  return {
    month,
    year
  };
};

export const removeSpaces = (value) => {
  if (!value) return '';

  return value.replace(/\s/g, '');
};
