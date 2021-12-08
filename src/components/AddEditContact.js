import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addContact, editContact } from "../redux/actions/contacts-action";

function AddEditContact({ addContact, editContactData, editContact }) {
  //   console.log(editContact);
  const [contact, setContact] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  useEffect(() => {
    setContact(editContactData);
  }, [editContactData]);
  const handleChange = (name, value) => {
    let oldContact = { ...contact };
    oldContact[name] = value;
    setContact(oldContact);
  };
  const handleSubmit = () => {
    if (contact.id !== null && contact.id !== undefined) {
      editContact(contact, contact.id);
      let oldContact = { ...contact };
      oldContact.id = null;
      setContact(oldContact);
    } else {
      addContact(contact);
    }

    setContact({
      name: "",
      phoneNumber: "",
      email: "",
    });
    closeRef.current.click();
  };
  const closeRef = useRef();
  return (
    <div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add/Edit Contact
          </h5>
          <button
            type="button"
            ref={closeRef}
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={contact.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                value={contact.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={contact.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    editContact: (contact, id) => dispatch(editContact(contact, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditContact);
