import React from "react";
import { Meteor } from "meteor/meteor";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";

export const ContactForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const saveContact = () => {
    // ContactsCollection.insert({ name, email, imageUrl });
    Meteor.call('contacts.insert', {name, email, imageUrl}, (errorResponse) => {
      if(errorResponse) {
        setErrorMessage(errorResponse.error);
        setSuccessMessage("");
        console.log(errorResponse.error);
      } else {
        setSuccessMessage("Contact saved.");
        setErrorMessage("");
        setName("");
        setEmail("");
        setImageUrl("");
      }
    });
  }

  return (
    <form>
      {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}
      {successMessage && <SuccessAlert message={successMessage}></SuccessAlert>}
      <div>
        <label htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="imageUrl">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={saveContact}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save Contact
        </button>
      </div>
    </form>
  )
}