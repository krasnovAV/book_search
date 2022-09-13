import {combineReducers, configureStore} from "@reduxjs/toolkit";
import Books from "./reducers/BooksSlice";


const rootReducer = combineReducers({
    books: Books
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

