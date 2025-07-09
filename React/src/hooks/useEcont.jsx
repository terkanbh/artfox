import { useContext } from 'react';
import { EcontContext } from '~/contexts/EcontProvider.jsx';

export const useEcont = () => useContext(EcontContext);