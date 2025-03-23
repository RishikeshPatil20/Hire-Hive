// controllers/UserController.js
import UserModel from "../models/UserModule.js";
import validator from "validator";
import JobsModule from "../models/JobsModule.js";
import ApplicationCounts from "../Public/assest/model.js";

const appCounts = new ApplicationCounts();
class UserController {
  viewHomePage(req, res) {
    res.render("home");
  }
  // viewJobsPage(req, res) {
  //   const jobs = JobsModule.getJobs();
  //   console.log(jobs);
  //   const userRole = "";
  //   res.render("jobs", { jobs ,userRole});
  // }
  viewJobsPage(req, res) {
    const jobs = JobsModule.getJobs();
    const userRole = req.session.user?.role || "guest"; // Default to "guest" if not logged in
    console.log("User Role in viewJobsPage:", userRole); // Debugging
    res.render("jobs", { jobs, userRole });
  }

  verifyUser(req, res) {
    const { UserEmail, UserPassword } = req.body; // Get email and password from form
    console.log(UserEmail, UserPassword); // Debugging logs

    const errors = [];
    const jobs = JobsModule.getJobs();

    // Input validation
    if (!UserEmail || !validator.isEmail(UserEmail)) {
      errors.push({ message: "Please enter a valid email" });
    }
    if (!UserPassword || UserPassword.length < 6) {
      errors.push({ message: "Password must be at least 6 characters long" });
    }

    // If validation fails, re-render login page with errors
    if (errors.length > 0) {
      return res.render("userlogin", {
        errorMessage: errors,
        email: UserEmail,
      });
    }

    // Fetch user from database
    const user = UserModel.validateUserEmail(UserEmail);
    if (!user || user.password !== UserPassword) {
      return res.render("userlogin", {
        errorMessage: [{ message: "Invalid email or password" }],
        email: UserEmail,
      });
    }

    // Store user in session
    req.session.loggedIn = true;
    req.session.user = { role: "user", email: UserEmail };

    // Redirect after successful login
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).send("Session error. Please try again.");
      }
      res.redirect("/jobs");
    });
  }

  viewJobDetails(req, res) {
    try {
      const jobId = req.params.jobId;
      const jobs = JobsModule.getJobs();
      const userRole = req.session.user?.role || "guest";
      // const userRole = req.query.role;
      //appCounts.incrementCount(jobId);

      console.log("userRole :", userRole);
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].jobId === parseInt(jobId)) {
          const job = jobs[i];
          const applicantCount = appCounts.getCount(jobId);
          return res.render("jobDetails", { job, applicantCount, userRole });
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

    return res.render("userApplyform", {
      jobs,
      jobId,
      applicantCount,
      userRole: "user",
    });
  }

  viewLoginPage(req, res) {
    res.render("userlogin");
  }
}

export default UserController;
