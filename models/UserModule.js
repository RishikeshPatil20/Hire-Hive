export default class UserModule {
  constructor(_id, _name, _email, _contact, _password, _resume) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.contact = _contact;
    this.password = _password;
    this.resume = _resume;
  }
  getUsers() {
    return users;
  }
  getName() {
    return this.name;
  }
  setName(_name) {
    return (this.name = _name);
  }
  getContact() {
    return this.contact;
  }
  setContact(_contact) {
    return (this.contact = _contact);
  }
  getEmail() {
    return this.email;
  }
  setEmail(_email) {
    return (this.email = _email);
  }
  getResume() {
    return this.resume;
  }
  setResume(_resume) {
    return (this.resume = _resume);
  }

  // static validateUserEmail(email) {
  //   let userFound = false; // Flag for checking if user is found
  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].email === email) {
  //       // Correct property access
  //       userFound = true;
  //       break;
  //     }
  //   }
  //   return userFound;
  // }
  static validateUserEmail(email) {
    return users.find(user => user.email === email) || null;
}

  static validateUser(email, password) {
    let userFound = false; // Flag for checking if user is found
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        // Correct property access
        userFound = true;
        break;
      }
    }
    return userFound;
  }

  //   static validateUser(email, password) {
  //     return users.find(user => user._email === email && user._password === password) !== undefined;
  //   }
  static deleteUserById(_id) {
    users = users.filter((item) => {
      return item._id != _id;
    });
  }
  getUserId(UserEmail, UserPassword) {
    for (let i = 0; i < users.length; i++) {
      if (UserEmail == users.email && UserPassword == users.password) {
        return users.id;
      }
    }
  }
}

let users = [
  new UserModule(
    1,
    "abc",
    "abc1@gmail.com",
    7896541230,
    "abcd123",
    "https://yourdomain.com/resumes/atharva-resume.pdf"
  ),
  new UserModule(
    1,
    "bcd",
    "bcd1@gmail.com",
    8896541230,
    "abcd123",
    "https://yourdomain.com/resumes/atharva-resume.pdf"
  ),
  new UserModule(
    1,
    "Atharva3",
    "atharva3@gmail.com",
    9896541230,
    "Atharva@223",
    "https://yourdomain.com/resumes/atharva-resume.pdf"
  ),
];
