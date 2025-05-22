// src/FormComponent.js
import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import data from "../data.json"; // Import data array from data.json

const FormComponent = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]); // State to hold parsed data items

  useEffect(() => {
    // Parse the data from data.json into display items
    const parsedItems = data.map((item) => {
      console.log(item);
      const [displayText, value] = item.split("/");
      return { displayText, value };
    });
    setItems(parsedItems);
  }, []);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Selected Item:", selectedItem);
    // Perform further actions with the selected item
  };

  return (
    <div>
      <TextField
        select
        label="Select Item"
        value={selectedItem}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.displayText}/{item.value}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormComponent;
