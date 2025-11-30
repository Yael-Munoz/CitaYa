import { API_BASE_URL } from "../config/apiConfig";

export async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        credentials: 'include'
    });

    if(res.status === 401) {
        const refreshRes = await fetch(API_BASE_URL + '/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        if(!refreshRes.ok) {
            throw new Error('Session expired, Please login again');
        }

        return fetch(url , {
            ...options,
            credentials: 'include'
        });
    }

    return res;
}