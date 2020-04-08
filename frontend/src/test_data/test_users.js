
// TODO read from backoff

// @TODO add hardcoded pswd


const TEST_ACCOUNTS = {
  users: [
    { id: "P001", login: "pavel", pswd: "demo", name: "Pavel I", user_type: "Patient", location: "Minsk" },
    { id: "P002", login: "john", pswd: "demo", name: "John W", user_type: "Patient", location: "NY" },
    { id: "D001",  login: "sophy", pswd: "demo", name: "Sophy M", user_type: "Doctor", location: "SA" },
    { id: "D002",  login: "aibol", pswd: "demo", name: "Aibolit", user_type: "Doctor", location: "Moscow" },
  ],
  all: function() { return this.users},
  get: function(id) {
    return this.users.find( u => u.id === id );
  },

};

export default TEST_ACCOUNTS
