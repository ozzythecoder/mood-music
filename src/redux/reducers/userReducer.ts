// import { AnyAction } from "@reduxjs/toolkit";

type LoginUser = {
    username: string,
    password: string
}

type SetUserAction = {
    type: "SET_USER";
    payload: LoginUser;
}

// type UnsetUserAction = {
//     type: 'UNSET_USER';
//     payload: ""
// }

const user = (state = [], action: SetUserAction) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        // case "UNSET_USER"
        default:
            return state;
    }
};

export default user;