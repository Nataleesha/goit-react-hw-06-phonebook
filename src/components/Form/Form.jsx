import React, { useState } from "react";
import css from "components/Form/Form.module.css";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "components/Redux/contactsSlice.js";

export default function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (name, number) => {
    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(name + " is already in your contacts.");
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
      setName("");
      setNumber("");
    }
  };

  const handleState = (e) => {
    e.preventDefault();
    handleSubmit(name, number);
  };

  return (
    <form className={css.form} onSubmit={handleState}>
      <label>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
