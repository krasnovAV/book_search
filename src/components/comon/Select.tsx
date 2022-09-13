import React, {FC} from 'react';

type Props = {
    name: string,
    value:string,
    options: string[],
    handleSubmit: (item:string) => void;
}

export const Select: FC<Props> = ({name, options,handleSubmit, value}) => {
    return (
        <>
            <select value={value} name={name} id={name}
                    onChange={e => handleSubmit(e.target.value)}>
                {options.map(opt => <option value={opt}>{opt}</option>)}
            </select>
        </>
    );
};

