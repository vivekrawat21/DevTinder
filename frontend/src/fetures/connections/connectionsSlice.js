import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
name: "connections",
initialState:{ 
  connections: []
},
reducers:{
    addConnection: (state, action) => {
        state.connections = action.payload;
    },
    clearConnections: (state) => {
        state.connections = [];
    },
},
});

export const { addConnection, removeConnection,clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;