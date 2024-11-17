import { create } from "zustand";

interface UserStore {
  token: string | null;
  user: { name: string; email: string } | null;
  login: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
}

const useUserLoginStore = create<UserStore>((set) => ({
  token: localStorage.getItem('tokenUser'), // Recupera el token del localStorage
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  login: (token, user) => {
    set({ token, user });
    localStorage.setItem('tokenUser', token);
    localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en el localStorage
  },
  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('user'); // Elimina los datos del usuario
  },
}));

export { useUserLoginStore };
