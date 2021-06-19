const express = require('express'); /* eslint-disable-line */
const cors = require('cors'); /* eslint-disable-line */
const multer = require('multer'); /* eslint-disable-line */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8081;
const uploadsDir = 'public/uploads/';
const app = express();

const dataToSend = require('./data.json');

// Prevent CORS problems (not safe)
app.use(cors());
// app.options('*', cors());

// Parse URL-encoded bodies
app.use(express.urlencoded());

// Parse JSON bodies
app.use(express.json());

/**
 * GET endpoints
 */

app.get('/api/get-data', (req, res) => {
    // console.log('GET::/api/get-data');
    console.log(req.query);
    // res.end(JSON.stringify(dataToSend));
    res.send(dataToSend);
});

/**
 * POST endpoints
 */
app.delete('/api/gallery-data', (req, res) => {
    const { body } = req;
    if (body.length) {
        body.forEach((item) => {
            fs.unlinkSync(uploadsDir + item);
            // fs.unlink(uploadsDir + item, (err) => {
            //     if (err) throw err;
            // });
        });
    }
    res.send({ result: 'ok' });
});

/**
 * Simpler way to upload an image (but without the extension).
 *
const upload = multer({
  dest: uploadsDir, // Omit to keep files in memory
});

app.post('/upload', upload.single('myImage'), function (req, res) {
  res.status(200).send();
});
 */

let imageName = '';
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename(req, file, cb) {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err);
            imageName = raw.toString('hex') + path.extname(file.originalname);
            cb(null, imageName);
            // cb(null, Date.now() + path.extname(file.originalname));
        });
    },
});
const upload = multer({ storage });

app.post('/api/image-data', upload.single('canvasImage'), (req, res) => {
    res.status(200).send({
        name: imageName,
    });
});

app.listen(port, host, () => {
    console.log('Server runs at http://%s:%s', host, port);
});
