import { configureStore } from '@reduxjs/toolkit';
import { DataReducer, SelectDataReducer } from './Reducer/DataReducer';
const store = configureStore({
    reducer: {
        DataReducer, SelectDataReducer
    }
})
export default store;