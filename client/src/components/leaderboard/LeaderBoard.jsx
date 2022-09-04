import './Items.css';
import BoardItem from './BoardItem';
import Card from './Card';
import BoardList from './BoardList'

function LeaderBoard(props) {

    return (
        <Card className='items'>
            <BoardList items={props.items} />
        </Card>
    );
}
export default LeaderBoard;