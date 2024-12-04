export default class JobsModule {
    constructor(_jobId, _jobCategory, _jobDesi, _jobLocation, _companyName, _salaryRange, _totalPositions, _skillsRequired, _applyByDate) {
        this.jobId = _jobId; 
        this.jobCategory = _jobCategory;
        this.jobDesi = _jobDesi; 
        this.jobLocation = _jobLocation;
        this.companyName = _companyName; 
        this.salaryRange = _salaryRange; 
        this.totalPositions = _totalPositions;
        this.skillsRequired = _skillsRequired;
        this.applyByDate = _applyByDate; 
    }
    
    getJobDetails() {
        return {
            jobId: this.jobId,
            jobCategory: this.jobCategory,
            jobDesi: this.jobDesi,
            jobLocation: this.jobLocation,
            companyName: this.companyName,
            salaryRange: this.salaryRange,
            totalPositions: this.totalPositions,
            skillsRequired: this.skillsRequired,
            applyByDate: this.applyByDate
        };
    }
    static getJobs(){
        return jobs;
    }
    setJobCategory(jobCategory) {
        this.jobCategory = jobCategory;
    }

    setJobDesi(jobDesi) {
        this.jobDesi = jobDesi;
    }

    setJobLocation(jobLocation) {
        this.jobLocation = jobLocation;
    }

    setCompanyName(companyName) {
        this.companyName = companyName;
    }

    setSalaryRange(salaryRange) {
        this.salaryRange = salaryRange;
    }

    setTotalPositions(totalPositions) {
        this.totalPositions = totalPositions;
    }

    setSkillsRequired(skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    setApplyByDate(applyByDate) {
        this.applyByDate = applyByDate;
    }

   // Method to update a job's details
//   updateJob(_jobId, updatedData) {
//     const jobIndex = this.jobs.findIndex(job => job.jobId === _jobId);
    
//     if (jobIndex === -1) {
//       throw new Error(`Job with ID ${_jobId} not found.`);
//     }

//     const job = this.jobs[jobIndex];
//     job.jobCategory = updatedData.jobCategory || job.jobCategory;
//     job.jobDesi = updatedData.jobDesi || job.jobDesi;
//     job.jobLocation = updatedData.jobLocation || job.jobLocation;
//     job.companyName = updatedData.companyName || job.companyName;
//     job.salaryRange = updatedData.salaryRange || job.salaryRange;
//     job.totalPositions = updatedData.totalPositions || job.totalPositions;
//     job.skillsRequired = updatedData.skillsRequired || job.skillsRequired;
//     job.applyByDate = updatedData.applyByDate || job.applyByDate;

//     this.jobs[jobIndex] = job;
//     return job;
//   }
static saveJobs(updatedJobs) {
    jobs = updatedJobs;
}

static updateJob(jobId, updatedData) {
    const jobs = this.getJobs(); // Assume this retrieves the list of jobs
    const jobIndex = jobs.findIndex(job => job.jobId === parseInt(jobId));
  
    if (jobIndex === -1) {
      return null; // Job not found
    }
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedData };
    this.saveJobs(jobs);

    return jobs[jobIndex];
  }
  
  static deleteJobById(jobId) {
    const jobIndex = jobs.findIndex(item => item.jobId === jobId);
    if (jobIndex !== -1) {
      jobs.splice(jobIndex, 1);
      return true; 
    }
    return false; 
  }
}

// Array to hold jobs (based on the example in the image)
let jobs = [
    // existing jobs...
    new JobsModule(1, 'Software Development', 'Full Stack Developer', 'Gurgaon HR IND Remote', 'Coding Ninjas', '14-20 LPA', 5, ['React', 'NodeJS', 'Angular'], '31-12-2024'),
    new JobsModule(2, 'Marketing', 'SEO Specialist', 'Bangalore IND', 'ABC Corp', '10-15 LPA', 3, ['SEO', 'Content Writing'], '15-11-2024'),
    new JobsModule(3, 'Data Science', 'Data Analyst', 'Remote', 'XYZ Solutions', '12-18 LPA', 2, ['Python', 'Data Analysis'], '30-10-2024'),
    
    // new jobs
    new JobsModule(4, 'Cloud Computing', 'Cloud Engineer', 'Hyderabad IND', 'Amazon Web Services', '20-25 LPA', 4, ['AWS', 'Azure', 'Google Cloud'], '20-02-2025'),
    new JobsModule(5, 'Cyber Security', 'Security Analyst', 'Mumbai IND', 'Infosys', '15-22 LPA', 6, ['Penetration Testing', 'Vulnerability Assessment'], '28-01-2025'),
    new JobsModule(6, 'Artificial Intelligence', 'AI/ML Engineer', 'Pune IND', 'Microsoft', '25-30 LPA', 7, ['TensorFlow', 'PyTorch', 'Keras'], '15-03-2025')
];

