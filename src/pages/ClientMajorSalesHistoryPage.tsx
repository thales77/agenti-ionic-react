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

import getDataFromAPI from '../utils/getDataFromApi';

import './ClientMajorSalesHistoryPage.css';
import MajorSalesHistoryList from '../components/MajorSalesHistoryList';

//test data
//import testData from '../testData';
import { AppContext } from '../State';


const ClientMajorSalesHistoryPage: React.FC = () => {

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

  useEffect(() => {
    setLoading(true);
    setError(false);
    let isMounted = true;
    const getData = async () => {
      const params = {
        action: 'aqcuistiMaggiori',
        clientId: state.selectedClient.codice,
        listOffset,
        perPage,
        user: state.user.name
      }
      try {
        const data = await getDataFromAPI(serverUrl, serverPort, params);
        setSalesArray(data.record);
      } catch (error) {
        setError(true)
      }
      setLoading(false);
    }
    getData();
    return () => { isMounted = false };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <IonTitle>Acquisti Maggiori</IonTitle>
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          {error ? <IonText color="danger">Errore recupero dati</IonText> : <MajorSalesHistoryList salesArray={salesArray} />}
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ClientMajorSalesHistoryPage;
