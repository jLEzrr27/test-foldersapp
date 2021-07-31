import React, { createContext, useState, useEffect } from 'react';
import history from "./History";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AppContext = createContext();

const AppProvider = ({children}) => {

    const [objLogin, setObjLogin] = useState({
        authenticated: false,
        email: "",
        token: "",
    });

    const confObjLogin = () => {
        
    }

    useEffect(() => {
        (async () => {
          await AsyncStorage.getItem("APPTEST::FOLDERS::CONTEXT").then((value) => {
            if (value === null) {
            } else {
              let objStorage = JSON.parse(value);

              if (JSON.parse(objStorage.authenticated) !== false) {
                const json = {
                  authenticated: objStorage.authenticated,
                  userName: objStorage.userName,
                  token: objStorage.token,
                };

                setObjLogin(json);

              } else {
                history.push("/login");
              }
            }
          });
        })();
      }, []);

      useEffect(() => {
        if (JSON.parse(objLogin.authenticated) !== false) {
          var objJson = JSON.stringify(objLogin);
          AsyncStorage.setItem("APPTEST::FOLDERS::CONTEXT", objJson);
        }
      }, [objLogin]);

      const loginContext = (obj) => {
        setObjLogin(obj);
      };
    
    return (
        <AppContext.Provider
          value={{
            loginContext,
            objLogin,
          }}
        >
          {children}
        </AppContext.Provider>
    );
};

export default AppProvider;