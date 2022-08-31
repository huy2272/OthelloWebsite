import './Items.css';
import BoardItem from './BoardItem';
import Card from './Card';

function LeaderBoard(props) {

    return (
        <Card className='items'>
            <BoardItem
                title={props.items[0].title}
                amount={props.items[0].amount}
            />
            <BoardItem
                title={props.items[1].title}
                amount={props.items[1].amount}
            />
            <BoardItem
                title={props.items[2].title}
                amount={props.items[2].amount}
            />
            <BoardItem
                title={props.items[3].title}
                amount={props.items[3].amount}

            />
            <BoardItem
                title={props.items[4].title}
                amount={props.items[4].amount}
            />
            <BoardItem
                title={props.items[5].title}
                amount={props.items[5].amount}

            />
            <BoardItem
                title={props.items[6].title}
                amount={props.items[6].amount}

            />
            <BoardItem
                title={props.items[7].title}
                amount={props.items[7].amount}

            />
            <BoardItem
                title={props.items[8].title}
                amount={props.items[8].amount}

            />
            <BoardItem
                title={props.items[9].title}
                amount={props.items[9].amount}

            />

        </Card>
    );
}
export default LeaderBoard;