import { useCookies } from 'react-cookie';

export const useCookie = (dependencies = []) => {
  const [cookies, setCookie, removeCookie] = useCookies(dependencies);

  return {
    cookies,
    setCookie,
    removeCookie
  };
};
