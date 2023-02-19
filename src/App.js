import Input from "./components/InputWater/Input";
import './app.scss'
import React, {useEffect, useState} from "react";
import Total from "./components/InputWater/Total";
import InputHistory from "./components/InputWater/InputHistory";

function App() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [allAddedItems, setAllAddedItems] = useState([])

    const handleInput = (inputValue) => {
        setTotalAmount(totalAmount + +inputValue.amount)
        setAllAddedItems(oldAmount => [...oldAmount, inputValue.amount])
    }

    const handleDelete = (index, amount) => {
        setAllAddedItems(allAddedItems.filter((item, i) => i !== index))
        setTotalAmount(totalAmount - +amount)
    }

    return (
        <div className="water-totals">
            <Total total={totalAmount}/>
            <Input handleInput={handleInput}/>
            <InputHistory addedItems={allAddedItems} indexToDelete={handleDelete}/>
        </div>
    );
}

export default App;
