import React from 'react';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
    // Xử lý thông tin đăng nhập thành công ở đây
};

const GoogleLoginButton = () => {
    return (
        <GoogleLogin
            clientId="268646320901-1qkkmtpj8dt8pbe08pig4n69r9f2rrd1.apps.googleusercontent.com"
            buttonText="Đăng nhập bằng Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;

