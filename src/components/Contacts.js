import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteContact,
  getAllContacts,
  getSingleContact,
} from "../redux/actions/contacts-action";
import AddEditContact from "./AddEditContact";

function Contacts({
  getAllContacts,
  contacts,
  getSingleContact,
  contact,
  deleteContact,
}) {
  useEffect(() => {
    getAllContacts();
  }, []);
  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      console.log("Deleted Successfully");
      deleteContact(index);
    }
  };
  return (
    <div>
      <div className="container d-flex flex-row justify-content-between mt-4">
        <h1>All Contacts</h1>
        <button
          className="btn btn-primary "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          +Add Contact
        </button>
      </div>
      <div className="container mt-4">
        {contacts.length === 0 && (
          <h1 className="text-danger text-center">No Contact Found</h1>
        )}
        {contacts.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">EMail</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>
                    <button
                      className="btn btn-primary me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => getSingleContact(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <AddEditContact editContactData={contact} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    contact: state.contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllContacts: () => dispatch(getAllContacts()),
    getSingleContact: (index) => dispatch(getSingleContact(index)),
    deleteContact: (index) => dispatch(deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
