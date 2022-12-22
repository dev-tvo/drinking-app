import React from 'react';
import './input-history.scss'
import {IconTrash} from '@tabler/icons';

const InputHistory = ({addedItems, indexToDelete}) => {
    const handleDelete = (index, amount) => {
        indexToDelete(index, amount)
    }
    return (
        <div className="drinks-history">
            <span>Drinks of today</span>
            <div className="list">
                {addedItems.map((item, index) => {
                    return (
                        <div
                            key={index}
                            id={index}
                            className="list-item">
                            <span>{item}</span>
                            <button onClick={() => handleDelete(index, item)}>
                                <IconTrash
                                    size={25}
                                    color="white"
                                    stroke={1}
                                />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InputHistory