
// TODO read from backoff

// @TODO add hardcoded pswd


const TEST_ACCOUNTS = {
  users: [
    { id: 1, login: "patient.john@gmail.com", pswd: "patient", name: "John W", user_type: "Patient", location: "NY" },
    { id: 2, login: "patient.pavel@gmail.com", pswd: "patient", name: "Pavel I", user_type: "Patient", location: "Minsk" },
    { id: 3,  login: "doctor.sophy@gmail.com", pswd: "doctor", name: "Sophy M", user_type: "Doctor", location: "SA" },
    { id: 4,  login: "doctor.aibolit@gmail.com", pswd: "doctor", name: "Aibolit", user_type: "Doctor", location: "Moscow" },
  ],
  all: function() { return this.users},
  get: function(id) {
    return this.users.find( u => u.id === id );
  },

};

export default TEST_ACCOUNTS
