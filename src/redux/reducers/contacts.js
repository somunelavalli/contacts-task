export const initialContacts = {
  contacts: [
    {
      name: "Somasekhar",
      phoneNumber: "123456",
      email: "somu@gmail.com",
    },
    {
      name: "Satheesh",
      phoneNumber: "7890123",
      email: "sathi@gmail.com",
    },
    {
      name: "Thanvi",
      phoneNumber: "23456789",
      email: "Thanvi@gmail.com",
    },
    {
      name: "Nelavalli",
      phoneNumber: "34561237",
      email: "Nelavalli@gmail.com",
    },
    {
      name: "Apple",
      phoneNumber: "1234567890",
      email: "apple@gmail.com",
    },
  ],
  contact: {},
};

export const contactsReducer = (state = initialContacts, action) => {
  switch (action.type) {
    case "GET_ALL_CONTACTS":
      return { ...state };
    case "ADD_CONTACT": {
      let contacts = [...state.contacts];
      contacts.push(action.payload);
      return { ...state, contacts };
    }
    case "EDIT_CONTACT": {
      let contacts = [...state.contacts];
      contacts[action.id] = action.payload;
      return { ...state, contacts };
    }
    case "DELETE_CONTACT": {
      let contacts = [...state.contacts];
      contacts.splice(action.id, 1);
      return { ...state, contacts };
    }
    case "GET_SINGLE_CONTACT":
      return {
        ...state,
        contact: { ...state.contacts[action.index], id: action.index },
      };
    default:
      return state;
  }
};
