import {useState, Fragment} from 'react';

const Accordion = ({items}) => {
    // Initialize a new piece of state using array destructure. The default useState value is ONLY used ONE!!!
    // activeIndex is the value that is gonna change. 
    // setActiveIndex updates the piece of state and the whole Component rerenders.
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };
    
    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? "active" : "";

        return (
            <Fragment key={item.title}>
                {/* We use callback function so the helper function doesn't execute
                the moment the Component is rendered */}
                {/* The active class defines whether the item will be expanded or not. */}
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </Fragment>
        );
    });

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
};

export default Accordion;