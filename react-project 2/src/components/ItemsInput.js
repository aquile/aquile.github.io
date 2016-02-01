/**
 * Created by aquile_bernadotte on 23.01.16.
 */
import React from 'react';

export default function ItemsInput({
    text,
        onChange,
        onAdd
}){
    return <span>
        <input value={text}
               onChange={
               e => onChange({value: e.target.value})
               }
            />
            <button onClick={onAdd}>Add</button>
        </span>
}
