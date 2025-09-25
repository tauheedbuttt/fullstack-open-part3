const app = require("../app");
// const { createServer } = require("../helpers/socket.helper");

//Use system configuration for port or use 3000 by default.
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = (req, res) => app(req, res);
// module.exports = app; // Export the app for serverless or testing purposes
