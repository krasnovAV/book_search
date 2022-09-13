import {IBook, IResponse} from "../../types/AppTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IBooksState {
    items: IBook[],
    totalItems: number | null,
    isLoading: boolean,
    error: string | null,
}

const initialState: IBooksState = {
    items: [],
    totalItems: null,
    isLoading: false,
    error: null,
}

export const BooksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        loadingBooks(state) {
            state.isLoading = true;
        },
        loadingBooksSuccess(state, action: PayloadAction<IResponse>) {
            state.isLoading = false;
            state.error = "";
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        },
        loadingBooksError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        loadMore(state, action: PayloadAction<IResponse>) {
            state.isLoading = false;
            state.error = "";
            state.items.push(...action.payload.items);
        }
    }
})

export default BooksSlice.reducer;