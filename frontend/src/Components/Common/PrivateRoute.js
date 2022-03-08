//@ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    children,
    loginPath,
    bypassAuthorization = null,
    permissionKey = null
}) => {
    let isAuthenticated = !!localStorage.getItem('user') || true;
    return isAuthenticated ? children : <Navigate to={loginPath} />;
};
