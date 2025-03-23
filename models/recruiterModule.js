export default class recruiterModule {
  constructor(_id, _name, _email, _contact, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }
  static recruiters =[
    { id: 1, name: 'recruiter1', email: 'recruiter1@gmail.com', password: 'recruiter1@123' },
    { id: 2, name: 'recruiter2', email: 'recruiter2@gmail.com', password: 'recruiter2@123' },
    { id: 3, name: 'recruiter3', email: 'recruiter3@gmail.com', password: 'recruiter3@123' },
  ];

  static getRecruiters() {
    return this.recruiters;
  }

  static getRecruiterName() {
    return this.name;
  }

  static setRecruiterName(_name) {
    return (this.name = _name);
  }

  static getRecruiterEmail(recruiterEmail) {
    let recruiterFound = false; // Flag for checking if recruiter is found
    for (let i = 0; i < this.recruiters.length; i++) {
      if (this.recruiters[i].email === recruiterEmail) {
        // Correct property access
        recruiterFound = true;
        break;
      }
    }
    return recruiterFound;
  }

  // static verfiyRecruiter(recruiterEmail, recruiterPassword) {
  //   const recruiter = this.recruiters.find(
  //     recruiter =>
  //       recruiter.email === recruiterEmail && recruiter.password === recruiterPassword
  //   );
  //   return recruiter;  // Return recruiter object or null if not found
  // }
  static verfiyRecruiter(recruiterEmail, recruiterPassword) {
    console.log('Inputs:', recruiterEmail, recruiterPassword);
    const recruiter = this.recruiters.find(
      recruiter =>
        recruiter.email === recruiterEmail && recruiter.password === recruiterPassword
    );
    console.log('Matched Recruiter:', recruiter);
    return recruiter;
  }
  

  static setRecruiterEmail(_email) {
    return (this.email = _email);
  }

  static addRecruiter(obj) {
    this.recruiters.push(obj);
  }
}



