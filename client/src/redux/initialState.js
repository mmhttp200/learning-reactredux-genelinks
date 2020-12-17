const initialState = {
    session: {
        isLoggedIn: false,
        fullname: undefined,
        token: undefined,
        nanoid: undefined,
        mainNavbar: [
            {name: 'Home', uri: '/'},
            {name: 'Login', uri: '/login'},
            {name: 'Register', uri: '/register'}
        ],
        genelinks: []
    },
    profile: {
        fullname: undefined,
        nanoid: undefined,
        genelinks: []
    }
}

export default initialState;