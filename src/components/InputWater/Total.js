import React, {useEffect, useRef, useState} from 'react';
import './total.scss'
import CountUp from "react-countup";

const Total = props => {
    const [prevAmount, setPrevAmount] = useState()
    const [newAmount, setNewAmount] = useState()
    const maxAmount = 2500;

    const usePreviousValue = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const prevCount = usePreviousValue(props.total);

    const calculateTotalPercentage = (state) => {
        let percentage = (state / maxAmount) * 100
        return percentage.toFixed(0);
    }

    const calculateLiterAmount = (amount) => {
        return (amount / 1000).toFixed(1);
    }

    const calculateWaveHeight = (amount) => {
        let newHeightPercentage
        if (!calculateTotalPercentage(amount) < 0) {
            newHeightPercentage = calculateTotalPercentage(amount) - 65;
        } else {
            newHeightPercentage = calculateTotalPercentage(amount);
        }
        return newHeightPercentage;
    }

    useEffect(() => {
        setPrevAmount(prevCount)
        setNewAmount(props.total)
        calculateTotalPercentage();
    }, [props.total, prevCount])

    return (
        <div className="total-amount">
            <div className="total-amount-percentage">
                <CountUp
                    start={calculateTotalPercentage(prevAmount)}
                    useEasing={true}
                    end={calculateTotalPercentage(newAmount)}
                    duration={1}
                />%
                <div className="total-amount-percentage-progress" style={{height: `${calculateWaveHeight(newAmount)}%`}}>
                    <svg viewBox="0 0 1440 320">
                        <path fill="#2389db"
                              d="M0,288L80,256C160,224,320,160,480,165.3C640,171,800,245,960,245.3C1120,245,1280,171,1360,133.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
            <div className="total-amount__text">
                {calculateLiterAmount(props.total)} of {calculateLiterAmount(maxAmount)} l
            </div>
        </div>
    )
}

export default Total