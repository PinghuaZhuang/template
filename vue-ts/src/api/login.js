import axios from 'axios';

// 验证邮箱和密码
export function apiVerifyUserInfo ( email, password ) {
    return new Promise( ( resolve, reject ) => {
        axios.get( '/mork/userInfo.json' ).then( respones => {
            let index, flag, user;

            flag = respones.data.some( ( el, i ) => {
                index = i;
                return el.email === email &&
                el.password === password;
            } );

            if ( flag ) {     // 成功
                user = respones.data[ index ];
                user.status = 1;
                resolve( { data: user, code: 1 } );
            } else {
                reject( { data: { }, code: -1 } );
            }
        } );
    } );
}

// 验证邮箱
export function apiVerifyUserEmail ( email ) {
    return new Promise( ( resolve, reject ) => {

        axios.get( '/mork/userInfo.json' ).then( respones => {
            let flag;

            flag = respones.data.some( ( el ) => {
                return el.email === email;
            } );

            if ( flag ) {     // 成功
                resolve( { data: 1, code: 1 } );
            } else {
                reject( { data: 0, code: -1 } );
            }
        } );
    } );
}
