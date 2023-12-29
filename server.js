const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: 'http://localhost:3001/api', 
  credentials: true, 
}));

app.use(bodyParser.json());

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`);

const rootValue = {
  users: () => [
    { id: '1', name: 'John', email: 'john@example.com' },
    { id: '2', name: 'Rock', email: 'rock@example.com' },
  ],
};

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));

const port = 4002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});