import React, { useMemo, useState } from "react";
import "./App.css";

const COLORS = ["#ff00f6", "#00ff50", "#fff900", "#ff8300"];
const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const menu = [
  {
    name: "Pizza",
    price: 222
  },
  {
    name: "Burger",
    price: 121
  },
  {
    name: "Food",
    price: 71
  }
];

const Form = () => (
  <form className="form">
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input type="text" id="price" />
    </div>
  </form>
);

const MenuItem = ({ name, price }) => {
  const color = useMemo(() => randomColor(), []);
  return (
    <div className="menu-item">
      <div className="info">
        <p className="name" style={{ color }}>
          {name || "Pizza"}
        </p>
        <p className="item-price" style={{ color }}>
          {price || "120"}
        </p>
      </div>
      <div className="action">
        <button type="button" style={{ color, borderColor: color }}>
          Add
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const { formOpen, setFormOpen } = useState(false);
  return (
    <div className="App">
      <div className="App-body">
        <div className="add-form">
          <button onClick={() => setFormOpen(true)}>Add Item</button>
          {formOpen && <Form />}
          {formOpen && <button type="button">Submit</button>}
        </div>
        <div className="menu-box">
          {menu.map(item => (
            <MenuItem {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
