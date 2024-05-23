const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/authenticate', async (req, res) => {
    const userDto = {
        login: req.body.username,
        senha: req.body.passwd
    };

    try {
        const response = await axios.post('http://localhost:8080/horus/security/authentication', userDto);
        res.render('result', { user: response.data, error: null });
    } catch (error) {
        res.render('result', { user: null, error: 'User not found or authentication failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
