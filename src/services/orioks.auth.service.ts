import axios from 'axios';
import { ORIOKS_AUTH_URL } from '../config/worker.config'
import { createAuthHeader } from '../utils/worker'

export const getToken = async (login:string, password:string) => {

    const authHeader = createAuthHeader(login,password);

    try { 
        const response = await axios.get(ORIOKS_AUTH_URL, {
        headers: {
            'Accept': 'application/json',
            'Authorization': authHeader,
            'User-Agent': 'bot_oreooks/0.1 Node.js/24.14.1'
        }});

        return response.data.token;
    } catch (e: any) {
        const status = e?.response?.status;

        if (status === 401) {
            throw new Error('Неверный логин или пароль');
        }

        if (status === 403) {
            throw new Error('Студент не может получить более восьми токенов');
        }

        throw new Error('Ошибка запроса к ORIOKS');
    }
}
 