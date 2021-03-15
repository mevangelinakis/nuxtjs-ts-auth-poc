import { Middleware } from '@nuxt/types';

const authAdmin: Middleware = ({ $auth, redirect }) => {
  const user = $auth.$state.user;

  if (!user || user.type !== 'admin') {
    redirect('/login');
  }
};

export default authAdmin;
