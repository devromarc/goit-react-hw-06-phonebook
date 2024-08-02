import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

// ===================
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/contactsSlice';

export const ContactListItem = ({ filteredContact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContacts(filteredContact.id));
    Notify.success(
      `${filteredContact.name} was successfully deleted from your contacts!`,
      { position: 'center-top' }
    );
  };

  return (
    <li className={css.items}>
      <p>{filteredContact.name}:</p>
      <p>{filteredContact.number}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
};
