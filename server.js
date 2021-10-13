const express =  require('express');
const translateString = require('./utils/read');
const multerConfig = require('./settings/multerConfig');
const multer = require('multer');
const axios  = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/configs', (req, res) => {
    const { stopLoss, stopWin, martinGales } = storage.getStorage();
    res.json({
        stopLoss,
        stopWin,
        martinGales
    });
});

const upload = multer(multerConfig).single('file');

app.post('/api/v2/login', async (req, res) => {
    try {
        const { identifier, password } = req.body; 
        const { data } = await axios.post('https://auth.iqoption.com/api/v2/login', {
            identifier,
            password
        });
        
        return res.json(data);
    } catch(e) {
        return res.status(401).json(e.response.data);
    }
});

app.post('/api/v2/sinais', (req, res) => {
    return upload(req, res, async(error) => {
        if(error) {
            console.log(error);
            return res.json({
                erros: ['Arquivo invalido']
            });
        }

        try {
            const response = await translateString();
            return res.status(200).json(response);
        } catch(e) {
            return res.status(500).json({
                erros: ['Arquivo invalido']
            });
        }
    })
});

app.listen(3001, () => {
    console.log('Server started');
});