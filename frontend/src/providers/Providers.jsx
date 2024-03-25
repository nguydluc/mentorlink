//import AuthenticationProvider from "./AuthenticationProvider";
import { UserProvider } from "./UserContext";
import RegistrationToggleProvider from "./RegistrationToggleProvider";

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <RegistrationToggleProvider>
    <UserProvider>{children}</UserProvider>
  </RegistrationToggleProvider>
);
export default Providers;
