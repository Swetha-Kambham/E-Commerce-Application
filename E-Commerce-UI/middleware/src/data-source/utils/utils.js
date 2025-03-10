export const mapToServiceDate = (dateObject) => {
  const { day, month, year } = dateObject || {};

  if (
    !day ||
    typeof day !== 'number' ||
    !month ||
    typeof month !== 'number' ||
    !year ||
    typeof year !== 'number'
  )
    return null;

  return new Date(year, month - 1, day + 1).toISOString().slice(0, 10);
};

export const productPreferenceTypes = {
  CART: 'cart',
  WISHLIST: 'wish-list'
};
