import { useReducer } from "react";

import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { types } from "../types/types";
import { authUserWithEmailPassword, logoutUser, registerUser, signInWithGoogle } from '../../firebase/providers'

const initialState = { logged: false };

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
        logged: !!user,
        user
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);


    const login = async (email = '', password = '') => {
        const { ok, uid, displayName, photoURL, errorMessage } = await authUserWithEmailPassword(email, password);


        if (!ok) {
            dispatch({ type: types.error, payload: { errorMessage } });
            return false;
        }

        const payload = { ok, uid, email, displayName, photoURL };
        console.log(payload)
        localStorage.setItem('user', JSON.stringify(payload));

        const action = { type: types.login, payload: payload }


        dispatch(action);

        return true;
    }

    const loginGoogle = async () => {
        const { ok, uid, displayName, photoURL, errorMessage, email } = await signInWithGoogle();


        if (!ok) {
            dispatch({ type: types.error, payload: { errorMessage } });
            return false;
        }

        const payload = { ok, uid, email, displayName, photoURL };
        console.log(payload)
        localStorage.setItem('user', JSON.stringify(payload));

        const action = { type: types.login, payload: payload }


        dispatch(action);

        return true;
    }

    const register = async (email, password, displayName) => {
        const { ok, errorMessage, photoURL, uid } = await registerUser({ email, displayName, password });
        const payload = {
            uid, email, photoURL, displayName
        };
    
        localStorage.setItem('user', JSON.stringify(payload));
    
        const action = { type: types.login, payload: payload }
    
        dispatch(action);
    
        return true;
    }

    const logout = async () => {

        await logoutUser();

        localStorage.removeItem('user')
        const action = { type: types.logout }
        dispatch(action)
    }


    return (
        <AuthContext.Provider value={
            {
                ...authState,
                login,
                logout,
                loginGoogle,
                register
            }
        }
        >
            {children}
        </AuthContext.Provider>
    )
}