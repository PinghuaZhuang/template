import { apiVerifyUserInfo } from '@/api/login';
import { getToken, setToken } from '../../utils/token';

const user = {
    state: {
        name: '',
        id: '',
        email: '',
        phone: '',
        status: '',
        avatar: '',
        token: getToken()
    },

    mutations: {
        SET_NAME ( state, name ) {
            state.name = name;
        },
        SET_ID ( state, id ) {
            state.id = id;
        },
        SET_EMAIL ( state, email ) {
            state.email = email;
        },
        SET_PHONE ( state, phone ) {
            state.phone = phone;
        },
        SET_STATUS ( state, status ) {
            state.status = status;
        },
        SET_AVATAR ( state, avatar ) {
            state.avatar = avatar;
        },
        SET_TOKEN ( state, data ) {
            setToken( data.name, data.expires );
            state.token = data.name;
        }
    },

    actions: {

        // 用户名登录
        LoginByUser ( store, { email, password } ) {

            // 本地模拟, 直接使用验证用户信息的接口
            return apiVerifyUserInfo( email, password )
                .then( response => {
                    console.log( '登录成功:', response.data );
                    if ( 1 === response.code ) {    // 登录成功
                        return response;
                    }
                } ).catch( err => {
                    throw new Error( `登录失败: ${err.code}` );
                } );
        }
    }
};

export default user;
