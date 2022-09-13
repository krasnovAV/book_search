import React, {FC} from 'react';

import "./Modal.css"

type Props = {
    active: boolean,
    setActive: (active: boolean) => void,
    children: React.ReactNode
}

export const Modal: FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};