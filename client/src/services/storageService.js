
export function getJwtToken() {
    return localStorage.getItem("token");
}

export default {
    getJwtToken,
};