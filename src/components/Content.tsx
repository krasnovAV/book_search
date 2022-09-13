import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {BookCard} from "./BookCard/BookCard";
// @ts-ignore
import style from "./Content.module.css"
import {loadMore} from "../store/reducers/ActionCreators";
import {MAX_RESULTS} from "../store/constValues";

type Props = {
    selectCategory: string,
    selectSortingBy: string,
    searchValue: string,
}

const Content: FC<Props> = ({selectSortingBy, selectCategory, searchValue}) => {
    const {
        totalItems,
        isLoading,
        error,
        items,
    } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);


    let pagesNumber = 0;
    if (totalItems) {
        pagesNumber = totalItems / MAX_RESULTS;
    }


    useEffect(() => {
        if (currentPage > 1) {
            dispatch(loadMore(searchValue, currentPage, selectCategory, selectSortingBy))
        }
    }, [currentPage])

    if (error) {
        return <h2>{error}</h2>
    }
    if (isLoading) {
        return <h1> Загрузка...</h1>
    }

    return (
        <div className={style.content__body}>
            {totalItems ? <h3 className={style.content__subtitle}> Количество книг найденых по запросу
                    "{searchValue}": {totalItems}</h3>
                : ""}
            <div className={style.content__books}>
                {items && items.map(item => <BookCard key={item.id}
                                                      volumeInfo={item.volumeInfo}
                />)}

            </div>

            {totalItems && pagesNumber > 1 && currentPage < pagesNumber &&
                <div className={style.content__button}>
                    <button  onClick={() => setCurrentPage(prev => prev + 1)}> Загрузить ещё </button>
                </div>}
        </div>
    );
};

export default Content;