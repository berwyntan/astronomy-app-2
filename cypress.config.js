require('dotenv').config();
const { defineConfig } = require("cypress");
const mongo = require('cypress-mongodb');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mongo.configurePlugin(on);
    },
  },
  "env": {
    "mongodb": {
        "uri": process.env.MONGODB_URL,
        "database": "test",
        "collection": "users"
    }
}
});
