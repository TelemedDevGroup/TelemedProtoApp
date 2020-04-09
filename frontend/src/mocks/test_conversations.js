const TEST_CONVERSATIONS = {
  conversations: [
    {
      id: "CONV001",
      userId: "P001",
      userName: "Pavel",
      doctorName: "Sophy M",
      doctorId: "D001",
      dialog: [
        { sender: "Pavel", message: "Hello" },
        { sender: "Pavel", message: "Will be late for 5 min" },
        { sender: "Sophy", message: "Hi, Pavel", partner: true },
        { sender: "Sophy", message: "No problem", partner: true },
        {
          sender: "Sophy",
          message: "",
          partner: true,
          attachment: "/chatImages/01.jpg",
        },
        { sender: "Pavel", message: "Thanks" },
      ],
    },
    {
      id: "CONV002",
      userId: "P001",
      userName: "Pavel",
      doctorName: "Aibolit",
      doctorId: "D002",
      dialog: [
        { sender: "Aibolit", message: "How are your feeling?", partner: true },
        { sender: "Pavel", message: "I feel much better" },
        {
          sender: "Pavel",
          message: "",
          attachment: "/chatImages/02.jpg",
        },
        { sender: "Aibolit", message: "Glad to hear!", partner: true },
        {
          sender: "Aibolit",
          message: "Watch",
          partner: true,
          attachment: "/chatImages/03.jpg",
        },
      ],
    },
    {
      id: "CONV003",
      userId: "P002",
      userName: "John W",
      doctorName: "Sophy M",
      doctorId: "D001",
      dialog: [
        { sender: "Pavel", message: "Hello" },
        { sender: "Pavel", message: "Will be late for 5 min" },
        { sender: "Sophy", message: "Hi, Pavel", partner: true },
        { sender: "Sophy", message: "No problem", partner: true },
        { sender: "Pavel", message: "Thanks" },
      ],
    },
    {
      id: "CONV004",
      userId: "P002",
      userName: "John W",
      doctorName: "Aibolit",
      doctorId: "D002",
      dialog: [
        { sender: "Pavel", message: "Hello" },
        { sender: "Pavel", message: "Will be late for 5 min" },
        { sender: "Aibolit", message: "Hi, Pavel", partner: true },
        { sender: "Aibolit", message: "No problem", partner: true },
        { sender: "Pavel", message: "Thanks" },
      ],
    },
  ],
  all: function () {
    return this.conversations;
  },
  get: function (userId) {
    return this.conversations.filter(
      (conversation) => conversation.userId === userId
    );
  },
};

export default TEST_CONVERSATIONS;
