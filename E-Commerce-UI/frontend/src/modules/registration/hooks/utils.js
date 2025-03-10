import { Roles } from 'modules/common/enums';

export const getRole = (query) => {
  const role = query.get('usr');

  if (role && role.toUpperCase() === Roles.admin.toUpperCase())
    return Roles.admin;
  if (role && role.toUpperCase() === Roles.seller.toUpperCase())
    return Roles.seller;

  return Roles.user;
};
