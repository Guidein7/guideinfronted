import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import config from "../../../config";

// export const employeeLogin = createAsyncThunk('employeeLogin',(formData) => {
//     return axios.post('https://burro-up-panda.ngrok-free.app/api/guidein/v1/auth/authenticate',formData)
//         .then(response => {
//             return { status: response.status, data: response.data }; // Return both status and data
//         })
//         .catch(error => error)
// })

export const employeeLogin = createAsyncThunk('employeeLogin', async (formData) => {
    try {
        const response = await axios.post(`${config.api.baseURL}${config.api.jobPoster.login}`, formData);
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, data: error.response.data };
    }
});

const employeeLoginSlice = createSlice({
    name:'employeeLoginSlice',
    initialState:{
        isAuthenticated:false,
        isLoading:false,
        data : {},
        status: null, // Initialize status as null
        error: null
    },
    reducers:{
        logoutEmployee: (state) => {
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
        builder.addCase(employeeLogin.pending,state => {
            state.isLoading = true;
        })
        builder.addCase(employeeLogin.fulfilled,(state,action) => {
            state.isLoading=false;
            state.status = action.payload.status; // Store status
            state.data = action.payload.data; // Store data
            state.isAuthenticated = true;
        })
        builder.addCase(employeeLogin.rejected,(state,action) => {
            state.isLoading=false;
            state.error= action.payload;
        })
    }
})

export default employeeLoginSlice.reducer;
export const {logoutEmployee}  = employeeLoginSlice.actions;
