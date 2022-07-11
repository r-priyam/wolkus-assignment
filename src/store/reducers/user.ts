import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../store';

export interface UserState {
    loggedUser: { loggedIn: boolean; name: string };
    users: Record<string, string>;
}

const initialState: UserState = {
    loggedUser: { loggedIn: false, name: '' },
    users: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, data: PayloadAction<string>) => {
            state.loggedUser = { loggedIn: true, name: data.payload };
        },
        signUp: (state, data: PayloadAction<{ userName: string; password: string }>) => {
            state.users[data.payload.userName] = data.payload.password;
            localStorage.setItem('users', JSON.stringify(state.users));

            localStorage.setItem(
                'logged-in',
                JSON.stringify({ loggedIn: true, name: data.payload.userName })
            );
            state.loggedUser = { loggedIn: true, name: data.payload.userName };
        },
        signOut: (state) => {
            localStorage.setItem('logged-in', JSON.stringify({ loggedIn: false, name: '' }));
            state.loggedUser = { loggedIn: false, name: '' };
        },
        setUsers: (state, data: PayloadAction<Record<string, string>>) => {
            state.users = data.payload;
        }
    }
});

export const { signIn, signUp, signOut, setUsers } = userSlice.actions;

export const loggedIn = (state: AppState) => state.user.loggedUser.loggedIn;
export const loggedUserName = (state: AppState) => state.user.loggedUser.name;
export const currentUsers = (state: AppState) => state.user.users;

export default userSlice.reducer;
