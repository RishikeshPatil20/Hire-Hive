import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import UserController from './controllers/UserController.js';
import upload from './middleware/uploadFile.js'; // Import the separated upload middleware
import session from 'express-session';
import RecruiterController from './controllers/RecruiterController.js';


const PORT = 8080;
const server = express();
const userController = new UserController();
const recruiterController= new RecruiterController();

// Middleware setup
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('Public'));
server.use(expressEjsLayouts);

//Session setup
server.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }  // 1 hour session expiration
}));

// View engine setup
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'views'));
server.set('layout', 'layout');

// Routes
server.get('/', userController.viewHomePage);
server.get('/jobs', userController.viewJobsPage);
server.get('/viewJobDetails/:jobId', userController.viewJobDetails);
server.post('/applyNow/:jobId', userController.userApplyform);
server.post('/authenticateUserLogin',upload.single('resume'),userController.verifyUser);
//recuriter controller
server.get('/registerRecruiter',recruiterController.viewRegisterRecruiter);
server.post('/authenticateRecruiterLogin',recruiterController.registerRecruiter);
server.get('/viewRecruiterLogin',recruiterController.viewLoginPage);
server.post('/verifyRecruiterLogin',recruiterController.verifyRecruiterLogin);
server.get('/viewUpdateForm/:jobId',recruiterController.viewUpdateJobForm);
server.post('/editjob/:jobId',recruiterController.updateJob);
server.get('/deleteJob/:jobId',recruiterController.deleteJob);
//jobseeker controller
server.get('/viewControllerLogin',userController.viewLoginPage);
server.post('/authenticateLogin',userController.verifyUser);
// Start the server verifyUser
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
