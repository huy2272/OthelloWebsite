import React, { useState } from 'react';
import './Items.css';

import Card from './Card';
import BoardList from './BoardList'
import PointsFilter from './PointsFilter'
import './BoardList.css'
function LeaderBoard(props) {
    const [filteredPoints, setFilterPoints] = useState(0);
    function filterChangeHandler(enteredYear) {
        setFilterPoints(enteredYear);
    }

    //Controlling which props.items can be displayed
    //props.items.filter will return true if it is equal to filteredYear, false otherwise
    //NOTE we do not change the arr, we just control which element is visible
    const filteredItems = props.items.filter(expense => {
        //Since filteredYear is a String we should turn the date to a String as well
        return expense.amount >= filteredPoints;
    });

    return (
        <Card className='items'>
            <PointsFilter selected={filteredPoints} onChangeFilter={filterChangeHandler} />
            <BoardList items={filteredItems} />
        </Card>
    );
}
export default LeaderBoard;