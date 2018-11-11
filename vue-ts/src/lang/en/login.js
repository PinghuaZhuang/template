let message = { };

let error = {
    email: [
        'Email address can\'t be empty',
        'Please enter a valid address',
        'Email address error'
    ],
    password: [
        'password cann\'t be empty',
        'Password length is no less than 6',
        'Password entry error',
        'Please complete the validation first'
    ]
};

const next = [
    'next',
    'sign in'
];

// 键名与文本一样
// 'next'.split( ' ' ).map( el => message[ el ] = el );

export default {
    ...message,
    signUp: 'sign up',
    signInTit: 'Sign In',
    signInTxt: 'Login to your Google account on any of your devices to get your bookmarks,' +
        ' history.',
    error,
    next,
    forgetEmail: 'Forget email?',
    emailOrPhone: 'Email or cell phone number',
    details: 'Find out the details',
    problem: 'Have problem?',
    password: 'Pleas enter password',
    lang: 'English'
};
