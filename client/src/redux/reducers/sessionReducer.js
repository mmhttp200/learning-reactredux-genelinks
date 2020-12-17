function sessionReducer(state = {}, action){
    switch(action.type){
        case 'SESSION_START':
            return {...state, isLoggedIn: true, mainNavbar: [
                    {name: 'My Profile', uri: '/my-profile'},
                    {name: 'Edit Account', uri: '/edit-account'},
                    {name: 'Logout', uri: '/logout'}
                ],
                ...action.data
            };
        case 'SESSION_CLOSE':
            return {...state, isLoggedIn: false, mainNavbar: [
                {name: 'Home', uri: '/'},
                {name: 'Login', uri: '/login'},
                {name: 'Register', uri: '/register'}
            ]};
        case 'UPDATE_EMAIL':
            return {...state, email: action.email};
        case 'UPDATE_GENELINKS':
            return {...state, genelinks: state.genelinks.concat(action.genelinks)};
        default:
            return state;
    }
}

export default sessionReducer;