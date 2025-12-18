import React from "react";

function BrowserPanel({ displayUrl, editUrl, onEditUrlChange, onGo }) {
  return (
    <div className="right-panel">
      
      <div className="address-bar">
        <input
          type="text"
          value={editUrl}
          onChange={(e) => onEditUrlChange(e.target.value)}
        />
        <button onClick={onGo}>Go</button>
      </div>

      <iframe
        src={displayUrl}
        title="live-preview"
        className="preview-frame"
      />
    </div>
  );
}

export default BrowserPanel;
