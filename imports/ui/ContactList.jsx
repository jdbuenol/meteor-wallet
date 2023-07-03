import React, {memo} from "react";
import {ContactsCollection} from "../api/ContactsCollection";
import {useFind, useSubscribe} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactList = () => {
  const isLoading = useSubscribe('allContacts');
  const contacts = useFind(() => ContactsCollection.find({}, { sort: {createdAt: -1 }}), []);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const removeContact = (e, _id) => {
    e.preventDefault();
    Meteor.call('contacts.remove', {contactId: _id}, (errorResponse) => {
      if(errorResponse){
        console.log(errorResponse.error);
        setErrorMessage(errorResponse.error);
        setSuccessMessage("");
      }
      else{
        setErrorMessage("");
        setSuccessMessage("Contact deleted successfully.");
      }
    });
  }

  const ContactItem = memo(({ contact }) => {
    return (
      <li key={contact._id}>
        <img src={contact.imageUrl} className="inline-block h-72"></img>
        {contact.name} - {contact.email} 
        <a href="#" onClick={(e) => removeContact(e, contact._id)} className="bg-indigo-800 text-white">REMOVE</a>
      </li>
    )
  });

  if(isLoading()){
    return <p>Loading...</p>
  }
  else{
    return (
      <>
        {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}
        {successMessage && <SuccessAlert message={successMessage}></SuccessAlert>}
        <h3>Contact List</h3>
        <ul>
          {contacts.map((contact) => (
            <ContactItem contact={contact}></ContactItem>
          ))}
        </ul>
      </>
    )
  }
}