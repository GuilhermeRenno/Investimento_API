const express = require('express');
const cors = require('cors');
const investmentsController = require('./controllers/investmentController.js')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.get('/investimentos', investmentsController.listAll);
app.post('/investimentos', investmentsController.create)
app.put('/investimentos/:id', investmentsController.update);
app.delete('/investimentos/:id', investmentsController.remove);

app.listen(PORT,()=>{

    console.log(`Servidor rodando em http://localhost:${PORT}/investimentos`);
})