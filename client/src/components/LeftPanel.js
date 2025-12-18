import React from "react";

function LeftPanel({ onLoadPage }) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="left-panel">
      <h2>Actions Panel</h2>

      <input
        type="text"
        placeholder="Enter website URL"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={() => onLoadPage(inputValue)}>
        Load in Browser →
      </button>
    </div>
  );
}

export default LeftPanel;
