const error = {
    email: [
        '电子邮件地址不能为空',
        '请输入正确的电子邮件',
        '找不到您的账号'
    ],
    password: [
        '输入密码不能为空',
        '输入密码长度不小于 6',
        '密码输入错误',
        '请先完成验证'
    ]
};

const next = [
    '下一步',
    '登录'
];

export default {
    signUp: '创建',
    signInTit: '登录后台',
    signInTxt: '在您的任意设备上登录 Google 帐号，即可获取您的书签、历史记录、密码和其他设置',
    error,
    next,
    forgetEmail: '忘记电子邮件？',
    emailOrPhone: '电子邮件或者电话号码',
    details: '了解详情',
    problem: '遇到问题？',
    password: '请输入密码',
    lang: '简体中文'
};
