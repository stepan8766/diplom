import React, { useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import { Provider } from 'react-redux';
import store from './store/index'
import { jwtDecode } from 'jwt-decode';


export const ContextUser = createContext({user: new UserStore(),}) 
const root = ReactDOM.createRoot(document.getElementById('root'));


const AppWrapper = () => {
    const { user } = useContext(ContextUser);
  
    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userData = { email: decoded.email, role: decoded.role }; // Добавьте данные о роли пользователя
        user.setUser(userData);
        user.setIsAuth(true);
        // console.log("User Role:", userData.role);
      }
    }, [user]);
  
    return <App />;
  };

  
  root.render(
    <Provider store={store}>
      <ContextUser.Provider value={{ user: new UserStore() }}>
        <AppWrapper />
      </ContextUser.Provider>
    </Provider>
  );

