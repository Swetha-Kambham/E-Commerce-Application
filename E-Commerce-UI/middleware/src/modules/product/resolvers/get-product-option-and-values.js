export const getProductOptionAndValues = (parent, args, context) => {
  const { options } = parent;

  return (options || []).map((option) => ({
    option: { id: option.id, name: option.optionName },
    values: (option.values || []).map((value) => ({
      id: value.id,
      name: value.valueName
    }))
  }));
};
