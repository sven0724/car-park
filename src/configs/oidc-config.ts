export  const OidcConfig = {
    authority: 'https://login.xanvi.com',
    redirect_uri: 'http://localhost:3000/authentication/callback',
    client_id: 'car-park-system',
    // client_id:'ancs',
    response_type: 'id_token token',
    scope: 'openid profile avatar glsapi carparksystemapiscope',
    post_logout_redirect_uri: 'http://localhost:3000/',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
    automaticSilentRenew: true,
    loadUserInfo: true,
};
