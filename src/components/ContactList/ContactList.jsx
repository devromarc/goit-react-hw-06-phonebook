import { ContactListItem } from 'components/ContactListItem/ContactListItem';
// ============================
import { getContacts, getFilter } from '../../redux/selector';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactListItem key={contact.id} filteredContact={contact} />
      ))}
    </ul>
  );
};
