import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import style from "./App.module.css"
// @ts-ignore
import icon from "./images/icon_search.png"
import {Select} from "./components/comon/Select";
import Content from "./components/Content";
import {getBooks} from "./store/reducers/ActionCreators";
import {useAppDispatch} from "./hooks/redux";
import {CATEGORIES, SORTING} from "./store/constValues";

const App: FC = () => {
    const categories = CATEGORIES;
    const sorting = SORTING;
    const [searchString, setSearchString] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState(categories[0])
    const [sortingBy, setSortingBy] = useState(sorting[0])

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchValue) {
            dispatch(getBooks(searchValue, category, sortingBy))
            setSearchString("");
        }
    }, [searchValue, category, sortingBy])

    return (
        <div className={style.wrapper}>
            <header className={style.header}>
                <h1 className={style.title}>Поиск книг</h1>
                <div className={style.searchForm}>
                    <div className={style.searchForm__search}>
                    <span className={style.searchForm__search}>
                        <img src={icon} alt=""/>
                        <input type="text" placeholder={"Введите название для поиска"}
                               value={searchString} onChange={e => setSearchString(e.target.value)}/>
                    </span>
                        <button onClick={() => setSearchValue(searchString)}>Поиск</button>
                    </div>
                    <div className={style.searchForm__filter}>
                        <h4>Категории</h4>
                        <Select name={"category"} options={categories} handleSubmit={setCategory} value={category}/>
                    </div>
                    <div className={style.searchForm__filter}>
                        <h4>Сортировать по</h4>
                        <Select name={"sorting"} options={sorting} handleSubmit={setSortingBy} value={sortingBy}/>
                    </div>
                </div>
            </header>

            <Content selectSortingBy={sortingBy} selectCategory={category} searchValue={searchValue}/>
        </div>
    );
}

export default App;
