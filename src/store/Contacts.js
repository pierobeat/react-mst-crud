import { types } from "mobx-state-tree";

export const Contact = types
    .model({
        id: types.identifierNumber,
        name: types.optional(types.string, ""),
        email: types.optional(types.string, ""),
        phoneNumber: types.number
    })

export const RootStore = types
    .model({
        contacts: types.array(Contact)
    })
    .actions(self => ({
        addContact(contactData) {
            self.contacts.push(contactData)
        },
        removeContact(data) {
            self.contacts.remove(data)
        },
        updateContact(id, data){
            const contactId = self.contacts.findIndex((contact) => contact.id === id)
            
            if (contactId > -1 && data) {
                self.contacts[contactId] = data;
              }
        }
    }));