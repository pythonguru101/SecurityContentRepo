//@ts-check
import axios from 'axios';

export const login = async (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    return await fetch(`/api/token/`, requestOptions);
};

