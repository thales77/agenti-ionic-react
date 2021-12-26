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
  IonText,
  IonModal
} from '@ionic/react';

import { Http } from '@capacitor-community/http';

import { AppContext } from '../State';

import './ItemDetailPage.css';
import { cartOutline, timer } from 'ionicons/icons';

import AddToCartModal from '../components/AddToCartModal';


const ItemDetailPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const apiAction = 'getItemById';

  const emptyItem = {
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

  const options = {
    url: `http://${serverUrl}:${serverPort}?action=${apiAction}&codiceArticolo=${state.itemId}&fasciaSconto=${state.client.categoriaSconto}&user=${state.user.name}`,
    headers: { 'Content-Type': 'application/json' },
    params: {},
  };

  //local state with defaults
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [itemDetails, setItemDetails] = useState<any>(emptyItem);
  const [showModal, setShowModal] = useState(false);

  //get data from API
  const getDataFromAPI = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await Http.request({ ...options, method: 'GET' })
      setItemDetails(JSON.parse(data));
    } catch (error: any) {
      setError(true);
    }
    setLoading(false);
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
            <IonCardSubtitle color="medium">{itemDetails.codiceArticolo} {itemDetails.codForn1 ? ' - ' : ''} {itemDetails.codForn1}</IonCardSubtitle>
            <IonCardSubtitle color="dark">{itemDetails.descrizione}</IonCardSubtitle>
            <IonCardSubtitle color="medium">{itemDetails.fornitoreArticolo}</IonCardSubtitle>
          </IonCardHeader>
          {error ?
            <IonCardContent>
              <IonText color="danger">Errore di comunicazione con il server</IonText>
            </IonCardContent>
            :
            <IonCardContent>
              <IonItem>
                <IonLabel>Disponibili: <IonText color="medium">{itemDetails.dispCa} {itemDetails.UMI}</IonText></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Prezzo lordo:  <IonText color="medium">{itemDetails.prezzoLordo}</IonText></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Sconti:  <IonText color="medium">{itemDetails.sconto1}  {itemDetails.sconto2 ? ' + ' : ''} {itemDetails.sconto2}</IonText></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Prezzo netto:  <IonText color="medium">{itemDetails.prezzoNetto}</IonText></IonLabel>
              </IonItem>
            </IonCardContent>
          }
        </IonCard>
        <br />
        <AddToCartModal
            itemId={itemDetails.codiceArticolo}
            itemDescription={itemDetails.descrizione}
            price={parseFloat(itemDetails.prezzoNetto.replace(",", "."))}
            um={itemDetails.UMI}
            available={itemDetails.dispCa}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        <IonButton expand="full" onClick={() => setShowModal(true)}><IonIcon slot="start" icon={cartOutline} />Aggiungi al carrello</IonButton><br />
        <IonButton expand="full"><IonIcon slot="start" icon={timer} />Storico prezzi applicati</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailPage;
