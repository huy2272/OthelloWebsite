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
        </Card>
    );
}
export default LeaderBoard;