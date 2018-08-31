dog-training
======

Abstract
------
This is a backend **API** built using **Node.js** to support a dog training web app using **React.js on frontend**.

Features
------
1. Authentication  
   JWT is used as mechanism to authenticate.   
   Session based auth (Passport.js) can't be used because it is irrelevant for an API.

2. MongoDb   
   MongoDb is a "not only SQL" database.   
   Purpose of using MongoDb is better scaling of webapp and JSON like structure.

3. Bcrypt is used to store digest.

Endpoints
------
1. /
2. /dogs/
3. /dogs/:id
4. /handlers/
5. /handlers/:id
6. /handlers/login
7. /handlers/signup
8. And more...