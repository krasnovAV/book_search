import React, {FC, useState} from 'react';
// @ts-ignore
import style from "./BookCard.module.css"
import {Modal} from "../comon/Modal";

type Props = {
    volumeInfo: {
        title: string | undefined,
        authors: string[] | undefined,
        description: string | undefined,
        pageCount: 240 | undefined,
        categories: string[] | undefined
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string,
        },
        language: string | undefined,
    }
}

export const BookCard: FC<Props> = ({volumeInfo}) => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className={style.bookCard}>
            <div className={style.bookCard__bookHover}>
                <img src={volumeInfo.imageLinks.smallThumbnail} onClick={() => setModalActive(true)} alt=""/>
            </div>
            <div className={style.bookCard__bookInfo}>
                {volumeInfo.categories && <div className={style.bookCard__item}>{volumeInfo.categories[0]}</div>}
                {volumeInfo.title && <div className={style.bookCard__title}>{volumeInfo.title}</div>}
                {volumeInfo.authors && volumeInfo.authors.map(author => <div className={style.bookCard__item}
                                                                             key={author}>{author}</div>)}
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={style.bookCardModal__content}>
                    <div className={style.bookCardModal__bookCover}>
                        <img src={volumeInfo.imageLinks.thumbnail} alt=""/>
                    </div>
                    <div>
                        <div className={style.bookCardModal__item}>
                            {volumeInfo.categories?.join("/")}
                        </div>
                        <h3 className={style.bookCardModal__title}>{volumeInfo.title}</h3>
                        <div className={style.bookCardModal__item}>
                            {volumeInfo.authors?.join(", ")}
                        </div>
                        <p>{volumeInfo.description}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

