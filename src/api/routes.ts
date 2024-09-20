const API_ROUTES = {
    auth: {
        sign_in: '/auth/sign-in',
        profile: '/auth/profile'
    },
    file: {
        post: '/save-file',
        delete: '/delete-file/:name'
    },
    gift: {
        list: '/gifts',
        post: '/gifts',
        get: '/gifts/:id',
        update: '/gifts/:id',
        delete: '/gifts/:id'
    }
};

export default API_ROUTES;
