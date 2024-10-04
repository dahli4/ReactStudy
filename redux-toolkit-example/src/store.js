import { configureStore } from '@reduxjs/toolkit';
import mySlice from './slice'

const myStore = configureStore(
    {
        reducer: {
            counter: mySlice.reducer
        }
    }
)

export default myStore;