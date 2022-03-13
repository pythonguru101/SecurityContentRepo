//@ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    children,
    loginPath,
    bypassAuthorization = null,
    permissionKey = null
}) => {
    let isAuthenticated = !!localStorage.getItem('user');
    return isAuthenticated ? children : <Navigate to={loginPath} />;
};
