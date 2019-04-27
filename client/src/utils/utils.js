import jwtDecode from 'jwt-decode';
export const getIdFromToken = (token) => {
    return jwtDecode(token).id;
};
export const getTokenData = (token) => {
    return (token && jwtDecode(token)) || {};
};
