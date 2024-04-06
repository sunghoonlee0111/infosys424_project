/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.uploadImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      // Here, you can handle the file
      // For example, you could upload it to Firebase Storage directly
    });

    busboy.on("finish", () => {
      const bucket = admin.storage().bucket("YOUR_FIREBASE_STORAGE_BUCKET_URL");
      const filePath = `uploads/${filename}`;

      bucket
        .file(filePath)
        .save(uploadData, {
          metadata: {
            contentType: mimetype,
          },
        })
        .then(() => res.status(200).send(`File uploaded.`))
        .catch((err) => res.status(500).send(err));
    });

    busboy.end(req.rawBody);
  });
});