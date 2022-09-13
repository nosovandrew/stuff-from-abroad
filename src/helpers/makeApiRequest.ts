// import axios, { AxiosRequestConfig } from 'axios';
// make request to db
const makeApiRequest = async <T>(
    url: string,
    config: RequestInit = {}
): Promise<T | undefined> => {
    try {
        // make request
        const response = await fetch(url, config);
        // check error
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        // response processing
        const parsedResponse = await response.json();

        return parsedResponse;
    } catch (error) {
        console.error(error);
    }
};

/* const makeAxiosApiRequest = async <T>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<T> => {
    try {
        // make request
        const response = await axios(url, config);
        // response processing
        const parsedResponse = await response.data;

        return parsedResponse;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}; */

export { makeApiRequest };
