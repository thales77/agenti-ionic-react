import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';

import { Http } from '@capacitor-community/http';

import { AppContext } from '../State';

import './ItemDetailPage.css';
import { cartOutline, timer } from 'ionicons/icons';


const ItemDetailPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //local state
  const item = {
    codiceArticolo: '',
    descrizione: '',
    codForn1: '',
    codForn2: '',
    sconto1: '',
    sconto2: '',
    prezzoLordo: '',
    prezzoNetto: '',
    UMI: '',
    UMV: '',
    dispCa: '',
    fornitoreArticolo: ''
  };

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  const options = {
    url: `http://${serverUrl}:${serverPort}?action=getItemById&codiceArticolo=${state.item.codiceArticolo}&fasciaSconto=${state.client.categoriaSconto}&user=Babis`,
    headers: { 'Content-Type': 'application/json' },
    params: {},
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [itemDetails, setItemDetails] = useState(item);

  //get data from API
  const getDataFromAPI = async () => {
    setLoading(true);
    try {
      const { data } = await Http.request({ ...options, method: 'GET' })
      setItemDetails(JSON.parse(data));
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  //get data on page load
  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ItemListPage" />
          </IonButtons>
          <IonTitle>Dettaglio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle color="medium">{itemDetails.codiceArticolo} - {itemDetails.codForn1}</IonCardSubtitle>
            <IonCardSubtitle color="dark">{itemDetails.descrizione}</IonCardSubtitle>
            <IonCardSubtitle color="medium">{itemDetails.fornitoreArticolo}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel>Disponibili: <IonText color="medium">{itemDetails.dispCa} {itemDetails.UMI}</IonText></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Prezzo lordo:  <IonText color="medium">{itemDetails.prezzoLordo}</IonText></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Sconti:  <IonText color="medium">{itemDetails.sconto1} + {itemDetails.sconto2}</IonText></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Prezzo netto:  <IonText color="medium">{itemDetails.prezzoNetto}</IonText></IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonButton expand="full"><IonIcon slot="start" icon={cartOutline} />Aggiungi al carrello</IonButton>
        <IonButton expand="full"><IonIcon slot="start" icon={timer} />Storico prezzi applicati</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailPage;
