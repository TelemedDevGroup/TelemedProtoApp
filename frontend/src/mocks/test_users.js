
// TODO read from backoff

// @TODO add hardcoded pswd


const TEST_ACCOUNTS = {
  users: [
    { id: 0xA3A1CF0215D9498EF15FCD5F1BFEA82A, login: "patient.john@gmail.com", pswd: "patient", name: "John W", user_type: "Patient", location: "NY" },
    { id: 0x27E2AA1976A1248DB42AED5F7DA5A11B, login: "patient.pavel@gmail.com", pswd: "patient", name: "Pavel I", user_type: "Patient", location: "Minsk" },
    { id: 0xCDDE122517D8518EBA1CEA5F7AF52281,  login: "doctor.sophy@gmail.com", pswd: "doctor", name: "Sophy M", user_type: "Doctor", location: "SA" },
    { id: 0xB1D4CA091CDF2481BA41F4DAA7DC156F,  login: "doctor.aibolit@gmail.com", pswd: "doctor", name: "Aibolit", user_type: "Doctor", location: "Moscow" },
  ],
  all: function() { return this.users},
  get: function(id) {
    return this.users.find( u => u.id === id );
  },

};

export default TEST_ACCOUNTS
