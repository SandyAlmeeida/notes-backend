const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./routes/notes');
const tagsRouter = require('./routes/tags');

app.use(express.json());

app.use(cors());

app.use('/notes', notesRouter);

app.use('/tags', tagsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});