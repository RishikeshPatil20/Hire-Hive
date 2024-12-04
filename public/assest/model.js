class ApplicationCounts {
  constructor() {
    this.applicantCounts = {};
  }
  getCount(jobId) {
    return this.applicantCounts[jobId] || 0;
  }
  incrementCount(jobId) {
    if (!this.applicantCounts[jobId]) {
      this.applicantCounts[jobId] = 0;
    }
    this.applicantCounts[jobId] += 1;
  }
}
export default ApplicationCounts;
