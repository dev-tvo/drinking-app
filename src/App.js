import Input from "./components/InputWater/Input";
import './app.scss'
import {useCallback, useEffect, useReducer, useState} from "react";
import Total from "./components/InputWater/Total";
import InputHistory from "./components/InputWater/InputHistory";
import total from "./components/InputWater/Total";

function App() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [allAddedItems, setAllAddedItems] = useState([])
    const [storageData, setStorageData] = useState({})

    const handleInput = (inputValue) => {
        setTotalAmount(totalAmount + +inputValue.amount)
        setAllAddedItems(oldAmount => [...oldAmount, inputValue.amount])
    }

    const handleDelete = (index, amount) => {
        setAllAddedItems(allAddedItems.filter((item, i) => i !== index))
        setTotalAmount(totalAmount - +amount)
    }

    const handleStorage = useCallback(() => {
        if (JSON.parse(localStorage.getItem('totalAmount')).totalAmount !== 0) {
            const storageData = {
                totalAmount: JSON.parse(localStorage.getItem('totalAmount')).totalAmount,
                allAddedItems: JSON.parse(localStorage.getItem('totalAmount')).allAddedItems
            }
            setTotalAmount(storageData.totalAmount)
            setAllAddedItems(storageData.allAddedItems)
        }
    }, [totalAmount, allAddedItems]);
    useEffect(() => {
        // handleStorage()
    }, [totalAmount])

    return (
        <div className="water-totals">
            <Total total={totalAmount}/>
            <Input handleInput={handleInput}/>
            <InputHistory addedItems={allAddedItems} indexToDelete={handleDelete}/>
        </div>
    );
}

export default App;
