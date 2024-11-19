import axios from "axios";

const url: string = "http://localhost:7000/api";

const getToken = (): string | null => {
    return localStorage.getItem('tokenUser');
}

const validateToken = async () => {
    const token = getToken();

    if (!token) {
        console.error("Token is missing. Please log in.");
        return { valid: false, message: "Token is missing" };
    }

    axios.defaults.headers['x-token'] = token;

    try {
        const response = await axios.get(`${url}/calendar`);
        return { valid: true, data: response.data };
    } catch (err: any) {
        if (err.response && err.response.status === 401) {
            console.info("Invalid or expired token. Redirecting to login.");
            return { valid: false, message: "Invalid or expired token" };
        }

        console.info("Error fetching data:", err.message);
        return { valid: false, message: "Error fetching data" };
    }
}

export { validateToken };
