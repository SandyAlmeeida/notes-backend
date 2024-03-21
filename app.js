const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
const tagsRouter = require('./routes/tags');

app.use(express.json());

app.use('/notes', notesRouter);

app.use('/tags', tagsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});