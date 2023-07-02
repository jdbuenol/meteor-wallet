import { Meteor } from 'meteor/meteor';
import "../imports/api/ContactsCollection";
import { ContactsCollection } from '../imports/api/ContactsCollection';

Meteor.startup(() => {
    Meteor.publish("contacts", function() {
        return ContactsCollection.find();
    })
});