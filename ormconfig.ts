{
  "type": "mongodb",
  "url": "mongodb+srv://linkapi:mongodb@cluster0.umzkk.mongodb.net/integrationdb?retryWrites=true&w=majority",
  "useNewUrlParser": true,
  "synchronize": true,
  "useUnifiedTopology": true,
  "logging": true,
  "ssl": true,
  "authSource": "admin",
  "entities": [
     "src/schemas/**/*.ts"
  ]
}
