import Input from "./components/InputWater/Input";
import './app.scss'
import React, {useEffect, useState} from "react";
import Total from "./components/InputWater/Total";
import InputHistory from "./components/InputWater/InputHistory";
import {getDatabase, set, ref, remove} from "firebase/database";
import {initializeApp} from "firebase/app";


function App() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [allAddedItems, setAllAddedItems] = useState([])
    const [idToDelete, setIdToDelete] = useState(null)

    const firebaseConfig = {
        databaseURL: "https://drink-water-c55d7-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    const app = initializeApp(firebaseConfig);


    const handleInput = (inputValue) => {
        setTotalAmount(totalAmount + +inputValue.amount)
        setAllAddedItems(oldAmount => [...oldAmount, inputValue.amount])
        handleSubmit(inputValue.amount, inputValue.id)
        setIdToDelete(inputValue.id)
    }

    const handleDelete = (index, amount) => {
        setAllAddedItems(allAddedItems.filter((item, i) => i !== index))
        setTotalAmount(totalAmount - +amount)

        const db = getDatabase(app);

        const dbRef = ref(db, 'drinks/' + idToDelete);

        remove(dbRef).then(() => {
            console.log("Remove succeeded.")
        })
    }

    const handleSubmit = (amount, id) => {
        function writeUserData(amount, date, id) {
            const db = getDatabase(app);
            set(ref(db, 'drinks/' + id), {
                amount: amount,
                date: date,
                id: id
            });
        }

        writeUserData(amount, new Date().toLocaleString(), id)
    }

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
