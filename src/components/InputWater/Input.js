import React, {useState} from 'react';
import './input.scss'
import {IconPlus} from '@tabler/icons';

const Input = props => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleClick = () => {
        if (inputValue !== '') {
            props.handleInput({
                amount: inputValue,
                date: new Date().toLocaleString()
            })
            setInputValue('')
        }
    }

    return (
        <div className="input-amount">
            <input
                type="number"
                min="0"
                max="1000"
                onChange={(e) => handleChange(e)}
                value={inputValue}
                placeholder={200}
                autoFocus
                onBlur={(e) => e.target.focus()}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            />
            <button onClick={handleClick} className="add-water">
                <IconPlus
                    size={36}
                    color="white"
                    stroke={2}
                />
            </button>
        </div>
    )
}

export default Input