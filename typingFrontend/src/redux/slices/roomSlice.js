import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: {}
}

const roomSlice = createSlice({
    name: 'room_Slice',
    initialState,
    reducers: {
        saveUser(state, action) {
            const { username, roomId } = action.payload;
            if (!state.rooms[roomId]) {
                state.rooms[roomId] = [username];
            } else {
                state.rooms[roomId].push(username);
            }
        }
    }
})

export const { saveUser } = roomSlice.actions;
export default roomSlice.reducer;
