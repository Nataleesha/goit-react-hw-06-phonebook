import React from "react";
import { nanoid } from "nanoid";
import Filter from "components/Form/Filter";
import Form from "components/Form/Form";
import Contacts from "components/Form/Contacts";
import { useSelector, useDispatch } from "react-redux";
import { addContact, removeContact } from "components/Redux/contactsSlice.js";
import { setFilter } from "components/Redux/filterSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.filter);

  const handleSubmit = (name, number) => {
    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(name + " is already in your contacts.")
      : dispatch(addContact({ id: nanoid(), name, number }));
  };

  const filterNames = (e) => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };

  const deleteContact = (contactId) => {
    dispatch(removeContact(contactId));
  };

  const lowerCaseFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(lowerCaseFilter)
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Form onFormSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeHandler={filterNames} />
      <Contacts contacts={filteredContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
