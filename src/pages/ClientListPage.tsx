import React, { useState, useContext } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import './ClientListPage.css';
import ClientSearchForm from '../components/ClientSearchForm';
import ClientList from '../components/ClientList';

//test data
//import testData from '../testData';


import { useDebounce } from '../hooks/useDebounce';

import { Http } from '@capacitor-community/http';

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

  const user = state.user.name;
  const action = 'searchClient';
  const clientSearchOptions = JSON.stringify(state.clientSearchOptions);


  const handleInput = (input: string) => {
    if (input === '') {
      setClientArray([]);
    }
    setSearchTerm(input);
  };

  //delay api call using a debounce hook
  useDebounce(async () => {
    const options = {
      url: `http://${serverUrl}:${serverPort}?action=${action}&searchTerm=${searchTerm}&clientSearchOptions=${clientSearchOptions}&listOffset=${listOffset}&perPage=${perPage}&user=${user}`,
      headers: { 'Content-Type': 'application/json' },
      params: {},
    };
    setLoading(true);
    setError(false);
    if (searchTerm.length > 0) {
      try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        const response = JSON.parse(data)
        setClientArray(response.record);
      } catch (error: any) {
        setError(true);
      }
    }
    setLoading(false);
  }, [searchTerm, state.clientSearchOptions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="false"></IonMenuButton>
          </IonButtons>
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
