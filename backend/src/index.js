const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


//#region Server Configuration

const app = express();
let questions = [];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//#endregion

//#region Middleware

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-7a5npqe4.auth0.com/.well-known/jwks.json`
  }),
  audience: 'Xh6g81j7KSg7S1EfhFoZDrJb1Kg6vEe0',
  issuer: `https://dev-7a5npqe4.auth0.com/`,
  algorithms: ['RSA256']
});

//#endregion

//#region GET Endpoints

// Get all questions
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length
  }));
  res.send(qs);
});

// Get specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (!question.length) return res.status(404).send();
  res.send(question[0]);
});

//#endregion

//#region POST Endpoints

// Insert a new question
app.post('/', checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// Insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const { answer } = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (!question.length) return res.status(404).send();

  question[0].answers.push({ answer, author: req.user.name });
  res.status(200).send();
});

//#endregion

//#region Server Start

app.listen(8081, () => { console.log('listening on port 8081') });

//#endregion