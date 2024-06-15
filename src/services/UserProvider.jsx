import PropTypes from "prop-types";
import { createContext, useState } from "react";

const defaultValues = {
  user: {},
  onChange: () => {},
};

export const UserContext = createContext(defaultValues);

function UserProvider({ children }) {
  const sessionStorageUser = JSON.parse(
    window.sessionStorage.getItem("AURA_SNEAKERS_USER")
  );
  const [user, setUser] = useState(
    sessionStorageUser ? sessionStorageUser : {}
  );

  function onChange(name, value) {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const resetUser = () => setUser({});

  return (
    <UserContext.Provider value={{ user, onChange, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
