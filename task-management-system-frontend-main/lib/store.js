import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserState'

export const store = 
   configureStore({
    reducer: {
        'assignTask': UserSlice.reducer
    }
  })