import axios from "axios";
import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: 'http://localhost:8080/sale/',
    timeout: 10000
});
let token = Cookies.get('tokenModel');
api.defaults.headers.common['token'] = token === null ? "kk.dd.ww" : token;

// Lắng nghe sự kiện thay đổi cookies
window.addEventListener('focus', () => {
    const updatedToken = Cookies.get('tokenModel');
    api.defaults.headers.common['token'] = updatedToken === null ? "kk.dd.ww" : updatedToken;
});
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = 'http://localhost:3001/login';
            return new Promise(() => {});
        }
        return Promise.reject(error);
    }
);
export default api 