import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children })=>{
    const [auth,setAuth] = useState({
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
    });

    const login = (token, name, id) => {
        localStorage.setItem('token',token);
        localStorage.setItem('name',name);
        localStorage.setItem('id',id);
        setAuth({ token, name, id });
    };

    const logout = (token, name, id) => {
        localStorage.clear();
        setAuth({ token: null, name: null, id: null });
    };

    return(
        <AuthContext.Provider value={{ auth, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);