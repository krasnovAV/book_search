import {AppDispatch} from "../store";
import {BooksSlice} from "./BooksSlice";
import axios from "axios";
import {IResponse} from "../../types/AppTypes";
import {MAX_RESULTS, START_INDEX} from "../constValues";

export const getBooks = (searchValue: string,
                         category: string = "all",
                         sortingBy: string = "relevance") => async (dispatch: AppDispatch) => {
    try {
        const apiKey = "AIzaSyA8fX871IweslRLm0sFDNy9r4pcFuRdKMs";
        dispatch(BooksSlice.actions.loadingBooks);
        const response = await axios.get<IResponse>(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&subject=${category}&startIndex=${START_INDEX}&maxResults=${MAX_RESULTS}&order_by=${sortingBy}&key=${apiKey}`)
        dispatch(BooksSlice.actions.loadingBooksSuccess(response.data))
    } catch (e: any) {
        dispatch(BooksSlice.actions.loadingBooksError(e.message))
    }
}

export const loadMore = (searchValue: string,
                         pageNumber: number,
                         category: string = "all",
                         sortingBy: string = "relevance") => async (dispatch: AppDispatch) => {
    try {
        const index = MAX_RESULTS * pageNumber;
        const apiKey = "AIzaSyA8fX871IweslRLm0sFDNy9r4pcFuRdKMs";

        dispatch(BooksSlice.actions.loadingBooks);
        const response = await axios.get<IResponse>(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&subject=${category}&startIndex=${index}&maxResults=${MAX_RESULTS}&order_by=${sortingBy}&key=${apiKey}`)
        dispatch(BooksSlice.actions.loadMore(response.data))
    } catch (e: any) {
        dispatch(BooksSlice.actions.loadingBooksError(e.message))
    }
}