import * as H from 'history';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import { Contact } from '@workshop/shared/api';

import { injector } from './contacts.injector';
import { ContactsService } from './contacts.service';

/**
 * Define tuple types
 */
export type ContactHookResults = [Contact[], (criteria: string) => void];
export type ContactDetailsResult = [Contact, H.History];

/**
 * Custom React Hook useful to load Contact details
 */
export function useContactDetailHook(): ContactDetailsResult {
  const { id } = useParams<Contact>();
  const history = useHistory();
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [service] = useState(injector.get(ContactsService));

  useEffect(() => {
    service.getContactById(id).then(setContact);
  }, [id, service, setContact]);

  return [contact, history];
}

/**
 * Custom React Hook useful to search and load Contacts
 */
export function useContactsHook(): ContactHookResults {
  const [criteria, setCriteria] = useState<string>('');
  const [people, setPeople] = useState<Contact[]>([]);
  const [service] = useState(injector.get(ContactsService));

  useEffect(() => {
    service.searchBy(criteria).then(setPeople);
  }, [criteria, service, setPeople]);

  return [people, setCriteria];
}
