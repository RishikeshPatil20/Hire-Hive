// controllers/recruitersController.js
import recruiterModule from "../models/recruiterModule.js";
import validator from "validator";
import JobsModule from "../models/JobsModule.js";
import ApplicationCounts from "../Public/assest/model.js";

const appCounts = new ApplicationCounts();
class RecruiterController {
  viewHomePage(req, res) {
    res.render("home");
  }
  viewJobsPage(req, res) {
    const jobs = JobsModule.getJobs();
    console.log(jobs);
    res.render("jobs", { jobs });
  }
  viewRegisterRecruiter(req, res) {
    res.render("recruiterSignUp");
  }
  verfiyRecruiter(req, res) {
    const { recruiterEmail, recruiterPassword } = req.body;
    console.log(recruiterEmail, recruiterPassword);
    const jobs = JobsModule.getJobs();
    const errors = [];
    if (!validator.isEmail(recruiterEmail)) {
      errors.push({ message: "Please enter a valid email" });
    }
    if (recruiterPassword.length < 4) {
      errors.push({ message: "Password must be at least 6 characters long" });
    }
    if (errors.length > 0) {
      return res.render("recruiterSignUp", {
        errorMessage: errors,
        email: recruiterEmail,
        password: "",
      });
    }
    const recruiter = recruiterModule.validateRecruiter(recruiterEmail);
    if (recruiter) {
      return res.render("jobs", { jobs });
    } else {
      return res.render("recruiterSignUp", {
        errorMessage: [{ message: "Invalid email or password" }],
        email: UserEmail,
        password: "",
      });
    }
  }

  registerRecruiter(req, res) {
    const { name, recruiterEmail, recruiterPassword } = req.body;
    console.log(
      "name :",
      name,
      " recruiter Email : ",
      recruiterEmail,
      "recruiter Password  :",
      recruiterPassword
    );
    if (!name || !recruiterEmail || !recruiterPassword) {
      return res.status(400).send("All fields are required.");
    }
    const existingRecruiter = recruiterModule.getRecruiterEmail(recruiterEmail);
    if (existingRecruiter) {
      return res.status(400).send("Recruiter already registered.");
    }
    const newRecruiter = new recruiterModule(
      recruiterModule.getRecruiters().length + 1, // Assign a new ID
      name,
      recruiterEmail,
      recruiterPassword
    );
    recruiterModule.addRecruiter(newRecruiter);
    res.redirect("/viewRecruiterLogin");
  }
  viewLoginPage(req, res) {
    res.render("recruiterLogin", { errorMessage: [] });
  }

  verifyRecruiterLogin(req, res) {
    try {
        const { recruiterEmail, recruiterPassword } = req.body;
        const errors = [];
        const jobs = JobsModule.getJobs();

        // Input validation
        if (!recruiterEmail || !validator.isEmail(recruiterEmail)) {
            errors.push({ message: "Please enter a valid email" });
        }
        if (!recruiterPassword || recruiterPassword.length < 6) {
            errors.push({ message: "Password must be at least 6 characters long" });
        }

        // Render login page with errors if validation fails
        if (errors.length > 0) {
            return res.render("viewRecruiterLogin", {
                errorMessage: errors,
                email: recruiterEmail || "",
            });
        }

        // Verify recruiter credentials via model
        const recruiter = recruiterModule.verfiyRecruiter(recruiterEmail, recruiterPassword);

        if (!recruiter) {
            return res.render("viewRecruiterLogin", {
                errorMessage: [{ message: "Invalid email or password" }],
                email: recruiterEmail || "",
            });
        }

        // Set session data
        req.session.loggedIn = true;
        req.session.user = { role: "recruiter", email: recruiterEmail };

        // Redirect to ensure session is available
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Session error. Please try again.");
            }
            res.redirect("/jobs");
        });

    } catch (error) {
        console.error("Error during recruiter login:", error);
        res.status(500).send("An unexpected error occurred.");
    }
}

  viewUpdateJobForm(req, res) {
    try {
      const jobId = req.params.jobId;
      const jobs = JobsModule.getJobs();
      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].jobId === parseInt(jobId)) {
          const job = jobs[i];
          res.render("jobUpdateForm", { job, jobId });
        }
      }
    } catch (error) {
      console.error("Error in viewJobDetails:", error);
      return res.status(500).send("An unexpected error occurred.");
    }
  }
  updateJob(req, res) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      jobType,
      companyName,
      salaryRange,
      totalPositions,
      applyBy,
    } = req.body;
    const skills = req.body.skills;
    console.log("Full body data:", req.body);
    console.log("skills :", skills);
    // Extract jobId from the request parameters
    const jobId = req.params.jobId;
    console.log("josId:", jobId);
    // Validate input (optional, based on your requirements)
    if (!jobId) {
      return res.status(400).send("Job ID is required.");
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).send("At least one skill must be selected.");
    }

    // Assuming you have a method in your JobsModule to update a job by ID
    const updatedJob = JobsModule.updateJob(jobId, {
      jobCategory,
      jobDesignation,
      jobLocation,
      jobType,
      companyName,
      salaryRange,
      totalPositions,
      skills,
      applyBy,
    });

    if (updatedJob) {
      const jobs = JobsModule.getJobs();
      req.session.loggedIn = true;
      res.render('jobs',{ jobs, userRole: "recruiter" });
    } else {
      res.status(404).send("Job not found.");
    }
  }
  deleteJob(req, res) {
    const jobId = parseInt(req.params.jobId); // Ensure `jobId` is an integer
  
    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job ID format." });
    }
  
    const jobDeleted = JobsModule.deleteJobById(jobId);
  
    if (jobDeleted) {
      res.status(200).json({ message: `Job with ID ${jobId} was successfully deleted.` });
    } else {
      res.status(404).json({ error: `Job with ID ${jobId} not found.` });
    }
  }
  
}

export default RecruiterController;
