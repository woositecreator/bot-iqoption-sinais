const express =  require('express');
const IQOption = require('./lib');
const { createOperation, resetOperations } = require("./utils/operation");
const startsOperations = require('./utils/createOperations');
const storage = require('./storage');
const multerConfig = require('./settings/multerConfig');
const multer = require('multer');

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let APIPublic;

async function bot() {
    const API = await IQOption({
        email: process.env.EMAIL,
        password: process.env.SENHA
    });
    console.log('IQOPTION CONECTED');

    API.setBalance('PRACTICE') // REAL OR PRACTICE
    APIPublic = API;
}

app.get('/configs', (req, res) => {
    const { stopLoss, stopWin, martinGales } = storage.getStorage();
    res.json({
        stopLoss,
        stopWin,
        martinGales
    });
});

app.post('/configs', (req, res) => {
    const { stopLoss, stopWin, martinGales } = req.body;

    if(stopLoss) storage.setStopLoss(stopLoss);
    if(stopWin) storage.setStopWin(stopWin);

    if(martinGales && typeof martinGales === 'object') storage.setMartinGales(martinGales);

    res.send(storage.getStorage());
});

const upload = multer(multerConfig).single('file');

app.post('/sinais', (req, res) => {
    return upload(req, res, async(error) => {
        if(error) {
            console.log(error);
            return res.json({
                erros: ['Arquivo invalido']
            });
        }

        try {
            startsOperations(APIPublic);
            return res.status(200).json({
                data: 'sucesso'
            });
        } catch(e) {
            console.log('deu erro');
            return res.status(500).json({
                erros: ['Arquivo invalido']
            });
        }
    })
});

bot();

app.listen(3000, () => {
    console.log('Server started');
});

//createOperation('11:50;USD/EUR;PUT;2');