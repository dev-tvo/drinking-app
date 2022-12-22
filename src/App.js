import Input from "./components/InputWater/Input";
import './app.scss'
import React, {useCallback, useEffect, useReducer, useState} from "react";
import Total from "./components/InputWater/Total";
import InputHistory from "./components/InputWater/InputHistory";
import total from "./components/InputWater/Total";
import {IconTrash} from "@tabler/icons";

function App() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [allAddedItems, setAllAddedItems] = useState([])
    const [data, setData] = useState([])

    const handleInput = (inputValue) => {
        setTotalAmount(totalAmount + +inputValue.amount)
        setAllAddedItems(oldAmount => [...oldAmount, inputValue.amount])
        handleSubmit(inputValue.amount)
    }

    const handleDelete = (index, amount) => {
        setAllAddedItems(allAddedItems.filter((item, i) => i !== index))
        setTotalAmount(totalAmount - +amount)
    }

    const handleSubmit = (amount) => {
        fetch('https://drink-water-c55d7-default-rtdb.europe-west1.firebasedatabase.app/drinks.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount
            })
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    const loadedTasks = [];

    const getData = async () => {

        try {
            const response = await fetch(
                'https://drink-water-c55d7-default-rtdb.europe-west1.firebasedatabase.app/drinks.json'
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            let sum = 0;
            for (const taskKey in data) {
                sum += parseInt(data[taskKey].amount);
                setTotalAmount(totalAmount + sum)
                setAllAddedItems(oldAmount => [...oldAmount, data[taskKey].amount])
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="water-totals">
            <Total total={totalAmount}/>
            <Input handleInput={handleInput}/>
            <InputHistory addedItems={allAddedItems} indexToDelete={handleDelete}/>
        </div>
    );
}

export default App;
