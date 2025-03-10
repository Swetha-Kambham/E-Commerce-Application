import { useHistory } from 'react-router-dom';
import useAuthContext from 'modules/auth';
import { debounce } from 'lodash';
import { Cookies } from 'react-cookie';

export const useLogout = () => {
  const { updateAuthContext } = useAuthContext();
  const cookies = new Cookies();
  const history = useHistory();

  return {
    logout: async () => {
      cookies.remove('token', { path: '/' });
      const updateAuthDebounce = debounce(async () => {
        if (!cookies.get('token')) {
          await updateAuthContext();
          history.push('/');
        } else {
          updateAuthDebounce();
        }
      }, 500);

      updateAuthDebounce();

      setTimeout(() => updateAuthDebounce.cancel(), 2000);
    }
  };
};
