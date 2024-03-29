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

const testData = require('./data.json');

// Prevent CORS problems (not safe)
app.use(cors());
// app.options('*', cors());

// Parse URL-encoded bodies
app.use(express.urlencoded());

// Parse JSON bodies
app.use(express.json());

/**
 * Test endpoint
 */

app.get('/api/get-data', (req, res) => {
    // console.log(req.query);
    // res.end(JSON.stringify(testData));
    res.send(testData);
});

/**
 * Delete data from gallery
 */
app.delete('/api/gallery-data', (req, res) => {
    const { body } = req;
    try {
        if (body.length) {
            body.forEach((item) => {
                fs.unlinkSync(uploadsDir + item);
            // fs.unlink(uploadsDir + item, (err) => {
            //     if (err) throw err;
            // });
            });
        }
        res.send({});
    } catch (err) {
        res.send(err);
    }
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
const upload = multer({ storage }).single('canvasImage');

/**
 * Upload image
 */
app.post('/api/image-data', (req, res) => {
    upload(req, res, (err) => {
        let errorMessage = '';
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            errorMessage = err;
        } else if (err) {
            // An unknown error occurred when uploading.
            errorMessage = err;
        }

        if (errorMessage) {
            res.status(500).send(err);
            return;
        }

        // Everything went fine.
        res.status(200).send({
            name: imageName,
        });
    });
});

app.listen(port, host, () => {
    console.log('Server runs at http://%s:%s', host, port);
});
