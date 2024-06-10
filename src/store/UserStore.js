import { makeAutoObservable } from "mobx";

class UserStore {
    constructor(role = "USER") {
        this._user = {};
        this._isAuth = false;
        this._role = role; 
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setRole(role) {
        this._role = role;
    }
    logout() {
        this._user = {};
        this._isAuth = false;
        localStorage.removeItem("jwtToken");
      }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role() {
        return this._role;
    }
}

export default UserStore;


// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: {},
//         isAuth: false
//     },

//     reducers: {
//         setUser(state, action) {
//             state.user = action.payload;
//         },
//         setIsAuth(state, action) {
//             state.isAuth = action.payload;
//         }
//     }
// });

// export const { setUser, setIsAuth } = userSlice.actions;
// export default userSlice.reducer;