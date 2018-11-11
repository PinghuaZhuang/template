/**
 * 主页路由
 */
export default {
    path: '/home',
    redirect: '/home/dashboard',
    name: 'home',
    component ( resolve ) {
        require( [ '@/pages/home' ], resolve );
    },
    children: [
        {   // 主面板
            path: 'dashboard',
            name: 'dashboard',
            component ( resolve ) {
                require( [ '@/pages/dashboard' ], resolve );
            }
        }
    ]
};
