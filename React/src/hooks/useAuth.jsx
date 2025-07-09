import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthProvider.jsx';

export const useAuth = () => useContext(AuthContext);