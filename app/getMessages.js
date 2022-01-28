const express = require('express');
const fs = require('fs');
const path = './messages';
const router = express.Router();
let messageArr = [];
let data = [];


router.get('/', (req, res) => {
    fs.readdir(path, (err, messageAr) => {
        messageAr.forEach(file => {
            const fileName = `${path}/${file}`;
            messageArr.push(fileName);
        });
    })
    const lastFiveMessage = messageArr.slice(messageArr.length - 5);

    lastFiveMessage.forEach(file => {
        fs.readFile(file, (err, message) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                if (data.length < 5) {
                    data.push(JSON.parse(message));
                }
            }
        })
    })
    console.log(data);
    return  res.send(data);
});

router.post('/', (req, res) => {
    const messages = {
        dateTime: new Date().toISOString(),
        message: req.body.message,
    };

    // data.push(messages);
    fs.writeFileSync(`./messages/${messages.dateTime}`, JSON.stringify(data));

    return  res.send(`created new message`);
});

module.exports = router;