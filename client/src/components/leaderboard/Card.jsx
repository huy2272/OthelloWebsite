import './Card.css'

function Card(props) {
    const classes = 'card ' + props.className;
    //props.children is the content between the opening and closing of your component
    //<name> props.children gets data from here </name>
    return <div className={classes}>{props.children}</div>;
}

export default Card;