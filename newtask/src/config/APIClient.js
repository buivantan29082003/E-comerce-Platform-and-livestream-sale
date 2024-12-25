import axios from 'axios';
import Cookies from 'js-cookie'; // Thư viện để làm việc với cookies

// Tạo instance của axios
const api = axios.create({
    baseURL: 'http://localhost:8080/user/auth/',
    timeout: 10000,
});

let token = Cookies.get('tokenModel');
api.defaults.headers.common['token'] = token === null ? "kk.dd.ww" : token;

window.addEventListener('focus', () => {
    const updatedToken = Cookies.get('tokenModel');
    api.defaults.headers.common['token'] = updatedToken === null ? "kk.dd.ww" : updatedToken;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
            window.location.href = 'http://localhost:3001/';
            return new Promise(() => {});
    }
);

export default api;
