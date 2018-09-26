if (process.env.NODE_ENV === "development") {
  module.exports = require("./devStore");
} else if (process.env.NODE_ENV === "production") {
  module.exports = require("./prodStore");
}
