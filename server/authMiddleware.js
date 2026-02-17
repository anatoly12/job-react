const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount))
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
}

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);

  if (!match) {
    return res.status(401).send('Unauthorized');
  }

  return admin
    .auth()
    .verifyIdToken(match[1])
    .then((decodedToken) => {
      req.user = decodedToken;
      req.userId = decodedToken.uid;
      next();
    })
    .catch(() => res.status(401).send('Unauthorized'));
};
