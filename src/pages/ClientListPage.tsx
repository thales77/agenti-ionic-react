import React, { useState, useContext, useEffect } from 'react';
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

import getDataFromAPI from '../utils/getDataFromApi';

import { AppContext } from '../State';

const ClientListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [clientArray, setClientArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [listOffset, setListOffset] = useState(0);
  const [perPage, setPerPage] = useState(50);


  const handleInput = (input: string) => {
    if (input === '') {
      setClientArray([]);
    }
    setSearchTerm(input);
  };

  //api call
  useEffect(() => {
    const getClientList = async () => {
      const params = {
        action: 'searchClient',
        searchTerm,
        clientSearchOptions: JSON.stringify(state.clientSearchOptions),
        listOffset,
        perPage,
        user: state.user.name
      }
      setLoading(true);
      setError(false);
      if (searchTerm.length > 0) {
        try {
          const data = await getDataFromAPI(serverUrl, serverPort, params);
          setClientArray(data.record);
        } catch (error) {
          setError(true)
        }
      }
      setLoading(false);
    }
    getClientList();
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
