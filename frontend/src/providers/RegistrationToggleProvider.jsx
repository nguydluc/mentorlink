import React, { useContext, useState, useMemo } from "react";

const RegistrationToggleContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useRegistrationToggleContext = () =>
  useContext(RegistrationToggleContext);

// eslint-disable-next-line react/prop-types
const RegistrationToggleProvider = ({ children }) => {
  const [registrationToggle, setRegistrationToggle] = useState(false);

  const theValues = useMemo(
    () => ({
      registrationToggle,
      setRegistrationToggle,
    }),
    [registrationToggle, setRegistrationToggle]
  );
  return (
    <RegistrationToggleContext.Provider value={theValues}>
      {children}
    </RegistrationToggleContext.Provider>
  );
};

export default RegistrationToggleProvider;
