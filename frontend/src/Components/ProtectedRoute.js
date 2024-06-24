import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Actions/LoginAction";
import { userFetchRequest } from "../Actions/UserAction";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        auth().catch(() => {setIsAuthorized(false); 
        console.log('have auth error')});
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Assuming refreshToken is form-urlencoded
                },
                body: `refresh=${refreshToken}`
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Something went wrong");
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.access); 
            dispatch(loginSuccess());
            dispatch(userFetchRequest()); // Set the new access token
            setIsAuthorized(true);
           
            
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('have no accessToken');
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                dispatch(loginSuccess());
                dispatch(userFetchRequest());
                setIsAuthorized(true);
               
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
