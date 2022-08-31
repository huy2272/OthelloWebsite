import React, { useState } from 'react'
import Card from './Card';
import './BoardItem.css';

function BoardItem(props) {

    const [title, setTitle] = useState(props.title);


    // function clickHandler() {
    //     setTitle('Updated title');
    // };

    return (
        <Card className="board-item">
            <div className="board-item__description">
                <h2>{title}</h2>
                <div className="board-item__points">{props.amount}</div>
            </div>
            {/* <button onClick={clickHandler}>Change Title</button> */}
        </Card>
    );
}

export default BoardItem;