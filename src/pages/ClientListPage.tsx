import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonProgressBar
} from '@ionic/react';
import './ClientListPage.css';
import ClientSearchForm from '../components/ClientSearchForm';
import ClientList from '../components/ClientList';

import getDataFromAPI from '../services/getDataFromApi';

import { AppContext } from '../State';

const ClientListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clientArray, setClientArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [listOffset, setListOffset] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(50);
  const mounted = useRef<boolean>(true);

  const handleInput = (input: string) => {
    mounted.current && setSearchTerm(input);
  };

  //api call
  useEffect(() => {
    const getList = async () => {
      mounted.current = true;
      setLoading(true);
      setError(false);
      const params = {
        action: 'searchClient',
        searchTerm,
        clientSearchOptions: JSON.stringify(state.clientSearchOptions),
        listOffset,
        perPage,
        user: state.user.name
      }
      if (searchTerm.length > 0) {
        try {
          const data = await getDataFromAPI(serverUrl, serverPort, params);
          mounted.current && setClientArray(data.record);
        } catch (error) {
          setError(true)
        }
      }
      setLoading(false);
      return () => mounted.current = false;
    }
    getList();
  }, [searchTerm, state.clientSearchOptions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <ClientSearchForm searchTerm={searchTerm} handleInput={handleInput} />
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
        <ClientList clientArray={clientArray} />
      </IonContent>
    </IonPage>
  );
};

export default ClientListPage;
