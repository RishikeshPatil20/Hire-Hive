// controllers/UserController.js
import UserModel from "../models/UserModule.js";
import validator from "validator";
import JobsModule from "../models/JobsModule.js";
import ApplicationCounts from '../public/assest/model.js';

const appCounts = new ApplicationCounts();
class UserController {
  viewHomePage(req, res) {
    // Pass any data to the homepage if necessary
    res.render("home");
  }
  viewJobsPage(req, res) {
    const jobs = JobsModule.getJobs();
    console.log(jobs);
    const userRole = "";
    res.render("jobs", { jobs ,userRole});
  }

  // verifyUser(req, res) {
  //   const { UserEmail } = req.body;
  //   console.log(UserEmail);
  //   const errors = [];
  //   const jobs = JobsModule.getJobs();
  //   //Validation of email and password
  //   if (!validator.isEmail(UserEmail)) {
  //     errors.push({ message: "Please enter a valid email" });
  //   }
  //   // if (UserPassword.length < 6) {
  //   //   errors.push({ message: "Password must be at least 6 characters long" });
  //   // }
  //   // if (!validator.isAlphanumeric(UserPassword)) {
  //   //   errors.push({ message: "Password must be alphanumeric" });
  //   // }

  //   // If there are validation errors, render the login page with error messages
  //   // if (errors.length > 0) {
  //   //   return res.render("userlogin", {
  //   //     errorMessage: errors, // Pass errors array to EJS template
  //   //     email: UserEmail, // Retain the email input
  //   //     password: UserPassword, // Retain the password input
  //   //   });
  //   // }

  //   // Check if user credentials are valid
  //   const user = UserModel.validateUser(UserEmail);
  //   if (user) {
  //     // Store user session on successful login
  //     return res.render("jobDetails", { jobs }); // Redirect to jobs page after login
  //   } else {
  //     return res.render("userlogin", {
  //       errorMessage: [{ message: "Invalid email or password" }],
  //       email: UserEmail,
  //       password: "", // Clear the password field
  //     });
  //   }
  // }
  verifyUser(req, res) {
    
    const { UserEmail } = req.body;
    console.log(UserEmail); // Log the submitted email to check its value
    const errors = [];
    const jobs = JobsModule.getJobs();
    if (!UserEmail || !validator.isEmail(UserEmail)) {
        errors.push({ message: "Please enter a valid email" });
    }
    if (errors.length > 0) {
        return res.render("userlogin", {
            errorMessage: errors, // Pass errors array to EJS template
            email: UserEmail, // Retain the email input
        });
    }
    const user = UserModel.validateUserEmail(UserEmail);
    if (user) {
        return res.render("jobs", { jobs }); // Redirect to jobs page after login
    } else {
        return res.render("userlogin", {
            errorMessage: [{ message: "Invalid email or password" }],
            email: UserEmail, // Retain the email input
            password: "", // Clear the password field
        });
    }
}

viewJobDetails(req, res) {
   try {
    const jobId = req.params.jobId;
    const jobs = JobsModule.getJobs();
    const userRole = req.query.role || 'guest'; 
    //appCounts.incrementCount(jobId);
    
    console.log("userRole :",userRole);
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].jobId === parseInt(jobId)) {
        const job = jobs[i]; 
        const applicantCount = appCounts.getCount(jobId);
        return res.render("jobDetails", { job,applicantCount,  userRole });
      }
    }
    return res.status(404).render("error", { message: "Job not found" });

   } catch (error) {
    console.error("Error in viewJobDetails:", error);
    return res.status(500).send("An unexpected error occurred.");
   } 
}

userApplyform(req, res) {
  const jobId = parseInt(req.params.jobId); // Ensure jobId is an integer
  const jobs = JobsModule.getJobs();

  appCounts.incrementCount(jobId);
  const applicantCount = appCounts.getCount(jobId);

  return res.render("userApplyform", { jobs, jobId, applicantCount });
}

  
}


export default UserController;
