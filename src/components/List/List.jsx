/* 
    We configure the useEffect hook to run some code automatically in one of 3 scenarios:
        1: When the component is rendered for the first time (runs once at the first render)
        2: When the component is rendered for the first time AND whenever it rerenders (runs after every render and at initial render)
        3: When the component is rendered for the first time AND
        (whenever it rerenders and some piece of data has changed)

        The 1st arg of the useEffect is a function. The 2nd arg controls when our code gets executed.
        The 2nd arg can be an empty array, an array with some value or values inside it or nothing at all. (The depedency array)
        For the 1st scenario ===> [] For the 2nd ===> nothing For the third ===> [data]

        We can't mark with async the function inside the useEffect hook.
        1st solution: create a temporary async function inside the useEffect hook's function and call it. (The recommended one)
        2nd solution: IIFE - define and invoke immediately the async function inside the useEffect hook's function.
        3rd solution: revert back to the use of Promises using the then() method.

        Through the useEffect hook the only thing we can return is another function, a cleanup function.
        When a change is made the clean up function is invoked automatically and then the function we provided
        as 1st arg to useEffect gets invoked again.
*/

import {useState, useEffect} from "react";
import axios from "axios";

const List = () => {
    const [term, setTerm] = useState("programming");
    // The debounced refers to the use of timer and the cancelation of it.
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);


    // We set timer to update debounced term and if the user updates term really quickly
    // we cancel the timeout we set and create a new timer.
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term)
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [term])
    
    // We CAN'T directly mark with async the function inside the useEffect hook.
    useEffect(() => {
        const searchWiki = async () => {
            const {data} = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: debouncedTerm,
                }
            });
            setResults(data.query.search);
        };
        
        if(debouncedTerm) {
            searchWiki();
        }

    }, [debouncedTerm]);

    const onInputChange = (e) => {
        setTerm(e.target.value);
    };

    const renderedResults = results.map(result => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* We have a string that we want to turn to JSX */}
                    {/* Anytime we take a string from a third party we could be introducing
                    security hole to our app, an XSS attack (cross-site scripting attack) */}
                    <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
                </div>
            </div>
        );
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" type="text" value={term} onChange={onInputChange} />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default List;