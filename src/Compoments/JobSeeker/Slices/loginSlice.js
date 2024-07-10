import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import config from "../../../config";




export const login = createAsyncThunk('login', async (formData) => {
    try {
        const response = await axios.post(`${config.api.baseURL}${config.api.jobSeeker.login}`, formData);
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, data: error.response.data };
    }
});

const loginSlice = createSlice({
    name:'loginSlice',
    initialState:{
        isAuthenticated: false, // Initialize isAuthenticated as false
        isLoading:false,
        data : {},
        status: null, // Initialize status as null
        error: null
    },
    reducers:{
        logoutUser: (state) => {
            // Clear user data when logging out
            state.isAuthenticated = false;
            state.isLoading = false;
            state.data = {};
            state.status = null;
            state.error = null;
        },
        authenticateUser: (state) => {
            // Set isAuthenticated to true when user is authenticated
            state.isAuthenticated = true;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(login.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.status; // Store status
            state.data = action.payload.data; // Store data
            state.isAuthenticated = true; // Set isAuthenticated to true upon successful login
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default loginSlice.reducer;
export const { logoutUser, authenticateUser } = loginSlice.actions;
