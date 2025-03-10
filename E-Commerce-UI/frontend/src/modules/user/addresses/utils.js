export const getFormattedAddress = (address) => {
  const {
    name,
    phoneNumber,
    pinCode,
    addressLine1,
    addressLine2,
    addressLine3,
    landmark,
    city,
    state
  } = address || {};

  const line1 = [];
  const line2 = [];
  const line3 = [];
  const line4 = [];

  if (name) line1.push(name);

  if (landmark) line2.push(landmark);
  if (addressLine1) line2.push(addressLine1);
  if (addressLine2) line2.push(addressLine2);
  if (addressLine3) line2.push(addressLine3);

  if (city) line3.push(city);
  if (state?.name) line3.push(state?.name);
  if (pinCode) line3.push(pinCode);
  if (phoneNumber?.countryCode && phoneNumber?.phoneNumber)
    line4.push(
      `Phone Number: ${phoneNumber?.countryCode}  ${phoneNumber?.phoneNumber}`
    );

  return {
    line1: line1.join(', '),
    line2: line2.join(', '),
    line3: line3.join(', '),
    line4: line4.join(', ')
  };
};
