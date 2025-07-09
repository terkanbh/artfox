import { createContext, useEffect, useState } from 'react';
import { getOffices } from '~/services/econtService.js';

export const EcontContext = createContext();

export const EcontProvider = ({ children }) => {
  const [offices, setOffices] = useState([]);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [error, setError] = useState(false);
  const filter = (searchTerm => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const searchTerms = normalizedSearchTerm.split(/\s+/);

    setFilteredOffices(offices.filter(x => {
      const normalizedOffice = x.trim().toLowerCase();
      const officeWords = normalizedOffice.split(/\s+/);
      return searchTerms.every(searchTerm =>
        officeWords.some(officeWord => officeWord.includes(searchTerm)));
    }));
  });

  useEffect(() => {
    getOffices()
      .then(res => {
        setOffices(res);
        setFilteredOffices(res);
      })
      .catch(_ => setError(true));
  }, []);

  return (
    <EcontContext.Provider value={{
      offices: filteredOffices,
      filter,
      error
    }}>
      {children}
    </EcontContext.Provider>
  );
};