import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";

const COLORS = ["#ff00f6", "#00ff50", "#fff900", "#ff8300"];
const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const GET_MENUS = gql`
  query {
    menuItems {
      id
      name
      price
    }
  }
`;

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
          Delete
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_MENUS);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  const { menuItems } = data;

  return (
    <div className="App">
      <div className="App-body">
        <div className="add-form">
          <button onClick={() => setFormOpen(o => !o)}>Add Item</button>
          {formOpen && <Form />}
          {formOpen && <button type="button">Submit</button>}
        </div>
        <div className="menu-box">
          {menuItems.map(item => (
            <MenuItem {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
