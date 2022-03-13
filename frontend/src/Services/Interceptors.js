const onRequest = (config) => {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo && userInfo.access) {
        config.headers['authorization'] = `Bearer ${userInfo.access}`;
    }
    return config;
};

const onRequestError = (error) => {};

const onResponse = (response) => {
    return response;
};

const onResponseError = (error) => {
    if (error.response.status === 401 && error.response.headers?.expired === 'true') {
        localStorage.removeItem('user');
        window.location.reload();
    }
    return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}
