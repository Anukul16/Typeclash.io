import {configureStore} from '@reduxjs/toolkit'
import resultContainerReducer from '../slices/resultContainerSlice'
import roomReducer from '../slices/roomSlice'

export const store = configureStore({
    reducer:{
        resultContainer:resultContainerReducer,
        room_Slice:roomReducer
    }
})