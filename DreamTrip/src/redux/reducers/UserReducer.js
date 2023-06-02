const initialUser = {
    isLogIn: false,
    firstLogIn:true,
    user: {},
}

const UserReducer = (user = initialUser, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const newUser = {
                isLogIn: true,
                firstLogIn:false,
                user: action.payload
            }
            return newUser
        }
        case 'LOGOUT': {
            const newUser = {
                isLogIn: false,
                firstLogIn:false,
                user: {}
            }
            return newUser
        }
        default:
            return user;
    }
}

export default UserReducer;