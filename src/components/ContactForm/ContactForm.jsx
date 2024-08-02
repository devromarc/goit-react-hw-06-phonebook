import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
// ===========================================
import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selector';
import { addContact } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //   Get the value of the Input Name and store it in state
  const handleNameChange = e => {
    setName(e.target.value);
  };

  //   Get the value of the Input Number and store it in state
  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      Notify.failure(`${name} is already in your contacts!`, {
        position: 'center-top',
      });
      setName('');
      setNumber('');
      return;
    } else {
      Notify.success(`${name} is successfully added to your contacts!`, {
        position: 'center-top',
      });
    }

    dispatch(
      addContact({
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      })
    );

    setName('');
    setNumber('');
  };

  return (
    <div className={css.formContainer}>
      <form className={css.form} onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            // add \ before - in [' \-] to make it work (LMS)
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          <p>Telephone</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </label>
        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};
