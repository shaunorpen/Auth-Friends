import axios from 'axios';

export default function axiosWithAuth() {
    const token = localStorage.getItem('token');
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
}