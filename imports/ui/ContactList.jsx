import React from "react";
import {ContactsCollection} from "../api/ContactsCollection";
import {useFind, useSubscribe} from 'meteor/react-meteor-data';

export const ContactList = () => {
  const isLoading = useSubscribe('contacts');
  const contacts = useFind(() => ContactsCollection.find(), []);

  if(isLoading()){
    return <p>Loading...</p>
  }
  else{
    return (
      <>
        <h3>Contact List</h3>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.email}>{contact.name} - {contact.email}</li>
          ))}
        </ul>
      </>
    )
  }
}