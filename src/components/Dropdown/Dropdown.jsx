/* 
    We want to here for click events outside the dropdown, so that we can close the dropdown when it's open.
    Event Bubbling: The event object describes the information about the event (eg. the click)
    The event travels up our DOM structure and if the elements have an onClick event handler then
    it is invoked with this event object.

    All the event listeners that are wired up using addEventListener are called first.
    Then and only then all the React event listeners get called and is from the most
    child element up to the most parent.

    If the user clicks on one of those dropdown elements, then we probably we don't want
    the body event listener to do anything. In the opposite occasion we do want the body
    event listener to close the dropdown. We need to figure out what element was clicked!!!

    useRef: allows us to get a direct reference to a DOM element.
*/

import {useState, useEffect, useRef} from "react";

const Dropdown = ({options, selected, onSelectedChange, label}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // To run only at the first render | We add manually an event listener.
    useEffect(() => {
        const onBodyClick = (event) => {
            // The contains() method belongs to all the DOM elements.
            if (ref.current) {
                if (ref.current.contains(event.target)) {
                    return;
                } 
            }

            setOpen(false);
        };

        document.body.addEventListener("click", onBodyClick);

        // When our dropdown is about to removed from the DOM React is going 
        // to automatically call our clean up function and that's going to 
        // remove the event listener watching for that click.
        return () => {
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);

    const renderedOptions = options.map(option => {
        if (option.value === selected.value) {
            return null; // Don't render anything
        }
        return (
            <div key={option.value} className="item" onClick={() => onSelectedChange(option)}>
                {option.label}
            </div>
        );
    });

    return (
        // The most parent element inside our component. (ref.current to access it)
        <div ref={ref} className="ui form">
            <div className="field">
                <label>{label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? "visible active" : ""}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? "visible transition" : ""}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;