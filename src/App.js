import {useState} from "react";

import Accordion from "./components/Accordion/Accordion";
import List from "./components/List/List";
import Dropdown from "./components/Dropdown/Dropdown";
import Translate from "./components/Translate/Translate";
import Route from "./components/Route/Route";
import Header from "./components/Header/Header";

const items = [
  {
    title: "What is React?",
    content: "React is a front end JavaScript framework"
  },
  {
    title: "Why use React?",
    content: "React is a favourite JS library among engineers"
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components"
  }
]

const options = [
  {
    label: "The Color Red",
    value: "red"
  },
  {
    label: "The Color Green",
    value: "green"
  },
  {
    label: "A Shade of Blue",
    value: "blue"
  }
];


function App() {
  const [selected, onSelectedChange] = useState(options[0]);
  // Every item in the items array will be an object with title and content.
  return (
    <div className="ui container">
      <Header/>
      {/* When we provide a JSX inside another JSX tag the inner element is provided to the outer one as a prop called children. */}
      <Route path="/">
        <Accordion items={items}/>
      </Route>

      <Route path="/dropdown">
        <Dropdown selected={selected} onSelectedChange={onSelectedChange} options={options} label="Select a color" />
      </Route> 

      <Route path="/list">
        <List />
      </Route>

      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};

export default App;
