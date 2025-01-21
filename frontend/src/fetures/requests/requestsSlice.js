import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "requests",
    initialState:{
        requests: []
    },
    reducers:{
        addRequest: (state, action) => {
            state.requests = action.payload;
        },
        removeRequest: (state, action) => {
            const index = state.requests?.findIndex(request => request._id === action.payload._id);
            if (index !== -1) {
                state.requests.splice(index, 1);
            }
        },
        clearRequests: (state) => {

            state.requests = [];
        }

    },
});

export const { addRequest, removeRequest,clearRequests } = requestSlice.actions;
export default requestSlice.reducer;