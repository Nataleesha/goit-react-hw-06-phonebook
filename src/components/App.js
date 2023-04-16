import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import Filter from "components/Form/Filter";
import Form from "components/Form/Form";
import Contacts from "components/Form/Contacts";

import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  removeContact,
  setFilter,
} from "components/Redux/store.js";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(name + " is already in your contacts.")
      : dispatch(addContact({ id: nanoid(), name: name, number: number }));
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
