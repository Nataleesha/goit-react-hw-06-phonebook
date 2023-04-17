import css from "components/Form/Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeContact } from "components/Redux/contactsSlice.js";

const Contacts = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const lowerCaseFilter = filter.toLowerCase();
  const deleteContact = (contactId) => {
    dispatch(removeContact(contactId));
  };
  const contacts = useSelector((state) => state.contacts.contacts);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(lowerCaseFilter)
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <p className={css.text}>
            {name}: {number}
          </p>
          <button
            className={css.btn}
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
