// export default class recruiterModule {
//     constructor(_id, _name, _email, _contact, _password, _resume) {
//       this.id = _id;
//       this.name = _name;
//       this.email = _email;
//       this.password = _password;
//     }
//     static getRecruiters() {
//       return recruiters;
//     }
//     static getRecruiterName() {
//       return this.name;
//     }
//     static setRecruiterName(_name) {
//       return (this.name = _name);
//     }   
//     static getRecruiterEmail(recruiterEmail) {
//       let recruiterFound = false; // Flag for checking if recruiter is found
//       for (let i = 0; i < recruiters.length; i++) {
//         if (recruiters[i].email === recruiterEmail && recruiters[i]) {
//           // Correct property access
//           recruiterFound = true;
//           break;
//         }
//       }
//       return recruiterFound;
//     }
//     static  verfiyRecruiter(recruiterEmail, recruiterPassword) {
//       const recruiter = recruiters.find(
//         recruiter =>
//           recruiter.email === recruiterEmail && recruiter.password === recruiterPassword
//       );
//       return recruiter || null;
//     }
//     static setRecruiterEmail(_email) {
//       return (this.email = _email);
//     }
//     static addRecruiter(obj){
//       recruiters.push(obj);
//     }
//   }
  
//   let recruiters = [
//     new recruiterModule(
//       1,
//       "recruiter1",
//       "recruiter1@gmail.com",
//       "recruiter1@123",
//     ),
//     new recruiterModule(
//         1,
//         "recruiter2",
//         "recruiter2@gmail.com",
//         "recruiter2@123",
//       ),
//       new recruiterModule(
//         1,
//         "recruiter3",
//         "recruiter3@gmail.com",
//         "recruiter3@123",
//       ),
//   ];
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



