import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import tracker from "./tracker"; // Import the single tracker instance
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://example.com");
  const [inputUrl, setInputUrl] = useState("");
  const [text1Input, setText1Input] = useState("");
  const [expandText1Left, setExpandText1Left] = useState(false);
  const [expandText2Left, setExpandText2Left] = useState(false);
  const [expandText1Menu, setExpandText1Menu] = useState(false);
  const [expandText2Menu, setExpandText2Menu] = useState(false);

  const [chatInput, setChatInput] = useState("");
  const [chatOutput, setChatOutput] = useState("");

  const iframeRef = useRef(null);
  const socketRef = useRef(null);

  // Connect to Socket.IO on mount
  useEffect(() => {
    // Note: OpenReplay tracker is already started in index.js
    // Just use the tracker instance for event tracking here

    // In production, connect to same origin (Render URL)
    // In development, connect to localhost:3000
    const serverURL = process.env.NODE_ENV === "production" 
      ? window.location.origin 
      : "http://localhost:3000";
    
    socketRef.current = io(serverURL);

    socketRef.current.on("connect", () => {
      console.log("Connected to server!");
      // Track server connection event
      tracker.event("server_connected", {
        url: socketRef.current.io.engine.transport.name,
      });
    });

    socketRef.current.on("chat-response", (response) => {
      setChatOutput(response);
      // Track chat response received
      tracker.event("chat_response_received", {
        responseLength: response.length,
        timestamp: new Date().toISOString(),
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleGo = () => {
    const finalUrl =
      inputUrl.startsWith("http") ? inputUrl : "https://" + inputUrl;
    setUrl(finalUrl);
    // Track URL navigation
    tracker.event("url_navigated", {
      url: finalUrl,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src || url;
      const base = currentSrc.split("#")[0];
      const separator = base.includes("?") ? "&" : "?";
      iframeRef.current.src = `${base}${separator}t=${Date.now()}`;
      // Track page refresh
      tracker.event("page_refreshed", {
        url: currentSrc,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleText1Trigger = () => {
    const queryRaw = text1Input.trim();
    if (!queryRaw) return;

    let domain = "";
    let currentUrl = url;
    try {
      domain = new URL(currentUrl).hostname;
    } catch {
      try {
        domain = new URL("https://" + currentUrl).hostname;
        currentUrl = "https://" + currentUrl;
      } catch {
        domain = "";
      }
    }

    const query = encodeURIComponent(queryRaw);
    let newURL = currentUrl;

    if (domain.includes("wikipedia.org")) {
      newURL = `https://wikipedia.org/wiki/${queryRaw.replace(/ /g, "_")}`;
    } else if (domain.includes("google.com")) {
      newURL = `https://www.google.com/search?q=${query}`;
    } else {
      const separator = currentUrl.includes("?") ? "&" : "?";
      newURL = `${currentUrl}${separator}search=${query}`;
    }

    setUrl(newURL);
    // Track action panel trigger
    tracker.event("action_panel_triggered", {
      query: queryRaw,
      domain: domain,
      resultURL: newURL,
      timestamp: new Date().toISOString(),
    });
  };

  const handleChatSend = () => {
    const userMessage = chatInput.trim();
    if (!userMessage) return;

    // Track chat message sent
    tracker.event("chat_message_sent", {
      messageLength: userMessage.length,
      messagePreview: userMessage.substring(0, 50),
      timestamp: new Date().toISOString(),
    });

    // Send chat message to server via Socket.IO
    socketRef.current.emit("chat-message", userMessage);

    setChatInput("");
  };

  return (
    <div className="container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="accordion">
          <div className="accordion-item">
            <div className="accordion-row">
              <button
                className="expand-btn"
                onClick={() => setExpandText1Left((prev) => !prev)}
              >
                {expandText1Left ? "▾" : "▸"}
              </button>
              <div className="accordion-label">Action Panel</div>
              <button
                className="menu-btn"
                onClick={() => setExpandText1Menu((prev) => !prev)}
              >
                ⋮
              </button>
            </div>
            {expandText1Left && (
              <div className="accordion-content">
                <input
                  className="chrome-input full-width"
                  type="text"
                  placeholder="Type here..."
                  value={text1Input}
                  onChange={(e) => setText1Input(e.target.value)}
                />
                <button className="chrome-btn" onClick={handleText1Trigger}>
                  Trigger
                </button>
              </div>
            )}
            {expandText1Menu && (
              <div className="menu-panel">
                <button className="menu-item" onClick={() => console.log("Rename")}>
                  Rename
                </button>
                <button className="menu-item" onClick={() => console.log("Clear")}>
                  Clear
                </button>
                <button className="menu-item" onClick={() => console.log("Delete")}>
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="accordion-item">
            <div className="accordion-row">
              <button
                className="expand-btn"
                onClick={() => setExpandText2Left((prev) => !prev)}
              >
                {expandText2Left ? "▾" : "▸"}
              </button>
              <div className="accordion-label">Record</div>
              <button
                className="menu-btn"
                onClick={() => setExpandText2Menu((prev) => !prev)}
              >
                ⋮
              </button>
            </div>
            {expandText2Left && (
              <div className="accordion-content">
                <div className="placeholder-box">Expanded content for text2</div>
              </div>
            )}
            {expandText2Menu && (
              <div className="menu-panel">
                <button className="menu-item" onClick={() => console.log("start recording")}>
                  start recording
                </button>
                <button className="menu-item" onClick={() => console.log("play")}>
                  play
                </button>
                {/* <button className="menu-item" onClick={() => console.log("Move down")}>
                  Move down
                </button> */}
              </div>
            )}
          </div>
        </div>

        {/* CHAT BOX AREA */}
        <div className="chat-container">
          <div className="chat-output">
            {chatOutput ? chatOutput : "Chat output will appear here..."}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              type="text"
              placeholder="Ask anything…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
            />
            <button className="send-btn" onClick={handleChatSend}>
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">

        <div className="browser-bar">
          <button className="refresh-btn" onClick={handleRefresh}>⟳</button>

          <input
            className="chrome-inputt"
            type="text"
            placeholder="Search or Enter URL"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGo()}
          />

          <button className="chrome-btn go-btn" onClick={handleGo}>GO</button>
        </div>

        {/* BROWSER INSIDE A CARD BOX */}
        <div className="browser-card">
          <iframe
            ref={iframeRef}
            src={url}
            className="iframe-view"
            title="browser"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
