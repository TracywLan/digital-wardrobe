import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import authController from './controllers/auth.js'; 
import wardrobeController from './controllers/wardrobe.js'
import isSignedIn from './middleware/is-signed-in.js';
import passUserToView from './middleware/pass-user-to-view.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || '3000';
const app = express(); 


mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to', mongoose.connection.name); 
});
mongoose.connection.on('error', (err)=>{
    console.log('Error connecting to MongoDB', err);
});

mongoose.connect(process.env.MONGODB_URI);


// Middleswares

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

  })
);

app.use(passUserToView);
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});



// Routes
app.get('/', (req, res)=>{
    res.render('index.ejs', {
        user: req.session.user,
    });
});

app.use('/auth', authController) ;

//must be logged in
app.use('/wardrobe', isSignedIn, wardrobeController);


app.listen(port, ()=>{
    console.log(`The express app is ready on port http://localhost:${port}`);
});