import { IuserData } from "./interfaces/userData.interface";

const url: string = "http://localhost:7000/api";

const postUsers = async (userData: IuserData) => {
    try {
        const reponse: any = await fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!reponse.ok) { throw new Error('Error to add user in database') };
        return await reponse.json();
    } catch (err: any) {
        console.error(err);
        throw err;
    }
}


const getUsers = async () => {
    try {
        const reponse: any = await fetch(`${url}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!reponse.ok) { throw new Error('Error to get usesr from database') };
        return await reponse.json();
    } catch (err: any) {
        console.error(err);
        throw err;
    }
}

const getUsersById = async (_id: string | number) => {
    try {
        const reponse: any = await fetch(`${url}/users/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!reponse.ok) { throw new Error('Error to get usesr from database') };
        return await reponse.json();
    } catch (err: any) {
        console.error(err);
        throw err;
    }
}

const loginUsers = async (userData: IuserData) => {
    try {
        const response = await fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.msg || 'Error en el login');
        }

        return data;
    } catch (err: any) {
        console.error('Error during login:', err);
        throw err;
    }
};

export { getUsers, postUsers, loginUsers, getUsersById };