import { Mongo } from 'meteor/mongo';

export const ContactsCollection = new Mongo.Collection('contacts');
ContactsCollection.allow({
    "insert": (userId, a) => {
        return true;
    }
});