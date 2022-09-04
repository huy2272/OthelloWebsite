import BoardItem from './BoardItem';
import './BoardList.css';
function BoardList(props) {

    if (props.items.length === 0) {
        return <h2 className='expenses-list__fallback'>Found no players.</h2>
    }

    return <ul className='expenses-list'>
        {props.items.map((expense) => (
            <BoardItem
                //By adding a key we avoid bugs 
                //and React will not have to go through each element in arr
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
            />
        ))}
    </ul>
}

export default BoardList;