import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonText,
  IonItem,
  IonProgressBar
} from '@ionic/react';

import { Http } from '@capacitor-community/http';

import './ClientSalesHistoryPage.css';
import SalesHistoryList from '../components/SalesHistoryList';

//test data
//import testData from '../testData';
import { AppContext } from '../State';


const ClientSalesHistoryPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);
  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [salesArray, setSalesArray] = useState([]);
  const [listOffset, setListOffset] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const user = state.user.name;
  const action = 'ultimiAcquisti';


  useEffect(() => {
    const getData = async () => {
      const options = {
        url: `http://${serverUrl}:${serverPort}?action=${action}&clientId=${state.client.codice}&listOffset=${listOffset}&perPage=${perPage}&user=${user}`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
      };

      setLoading(true);
      setError(false);
      try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        const response = JSON.parse(data)
        setSalesArray(response.record);
      } catch (error: any) {
        setError(true);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <IonTitle>Storico Acquisti</IonTitle>
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          {error ? <IonText color="danger">Errore recupero dati</IonText> : <SalesHistoryList salesArray={salesArray} />}
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ClientSalesHistoryPage;
