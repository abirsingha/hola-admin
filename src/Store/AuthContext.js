import React, {useState} from "react";

const AuthContext = React.createContext({
  items: '',
  isLoggedIn: false,
  login: (toke, email) => { },
  logout: () => {},
  user: (name) => {}
});

export const AuthcontextProvide = (props) => {
  let details = {token: '', email: '', password: ''};
  const initialState = localStorage.getItem('details');
  const [items, setItems] = useState(initialState);
  const userIsLoggedIn = !!items;
  const loginHandler = (token, email, password) => {
    details = {token: token, email: email, password: password}
    localStorage.setItem('details', JSON.stringify(details));
    setItems(details);
  }
  const logoutHandler = () => { 
    setItems(null);
    localStorage.removeItem('details');
  }
  const contextValue = {
    items: items,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;