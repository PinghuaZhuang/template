import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken () {
    return Cookies.get( TokenKey );
}

export function setToken ( token, expires = 7 ) {
    return Cookies.set( TokenKey, token, expires == null ? undefined : { expires } );
}

export function removeToken () {
    return Cookies.remove( TokenKey );
}
