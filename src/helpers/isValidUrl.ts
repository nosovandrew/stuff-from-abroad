// check correct url input
const isValidUrl = (mayBeUrl: string) => {
    try {
        return Boolean(new URL(mayBeUrl));
    } catch (e) {
        return false;
    }
};

export default isValidUrl;
