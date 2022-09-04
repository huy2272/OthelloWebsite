import React, { useState } from 'react';
import Card from './Card';
import './BoardItem.css';

function BoardItem(props) {


    return (
        <Card className="board-item">
            <div className="board-item__description">
                <h2>{props.title}</h2>
                <div className="board-item__points">{props.amount}</div>
            </div>
        </Card>
    );
}

export default BoardItem;