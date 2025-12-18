import Tracker from "@openreplay/tracker";

// Project key from environment variable
const projectKey = process.env.REACT_APP_OPENREPLAY_PROJECT_KEY;

if (!projectKey) {
  console.warn("⚠️ OpenReplay: projectKey is missing.");
}

// Create tracker
const tracker = projectKey
  ? new Tracker({
      projectKey,
      defaultInputMode: 0,        // record inputs
      obscureInputNumbers: true,  // mask numbers
      obscureInputEmails: false,  // allow emails
    })
  : {
      event: () => {},
      start: () => Promise.resolve(),
      stop: () => {},
    };

// Start tracker
if (projectKey) {
  tracker.start()
    .then(() => {
      console.log("✅ OpenReplay started successfully (cloud mode)");
    })
    .catch((err) => {
      console.error("❌ OpenReplay failed to start:", err);
    });
}

export default tracker;
