export interface IBook {
    id: string,
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

export interface IResponse {
    items: IBook[],
    totalItems: number,
}