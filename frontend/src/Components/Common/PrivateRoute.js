//@ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    children,
    loginPath,
    bypassAuthorization = null,
    permissionKey = null
}) => {
    // <Route
    //     {...rest}
    //     element={(props) => {
    //         if (localStorage.getItem('user')) {
    //             return <Component {...props} />;
    //         } else {
    //             return (
    //                 <Route
    //                     path={loginPath}
    //                     render={() => (
    //                         <Redirect
    //                             to={{ pathname: loginPath, state: { from: props.location } }}
    //                         />
    //                     )}
    //                 />
    //             );
    //         }
    //     }}
    // />
    let isAuthenticated = localStorage.getItem('user');
    return isAuthenticated ? children : <Navigate to={loginPath} />;
};
