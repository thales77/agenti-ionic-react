import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';

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
  IonModal,
  IonBadge
} from '@ionic/react';

import { AppContext } from '../State';
import getDataFromAPI from '../services/getDataFromApi';

import './ItemDetailPage.css';
import { cartOutline, timer, cart } from 'ionicons/icons';

import AddToCartModal from '../components/AddToCartModal';
import ItemPriceHistoryList from '../components/ItemPriceHistoryList';

let umi: string = "";
let umm: string = "";
let umv: string = "";
let umco1: number = 0;
let umco2: number;
let umrel1: string = "";
let umrel2: string = "";
let umrel3: string = "";
let umrel4: string = "";
let conversionRatio: number = 0; // Quantità di vendita to Quantità inventariale conversion ratio
let qtyi: number = 0;
let qtyv: number = 0;
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

//see .env
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;


const ItemDetailPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //local state with defaults
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<any>(emptyItem);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPriceHistory, setShowPriceHistory] = useState<boolean>(false);
  const [priceArray, setPriceArray] = useState([]);
  const mounted = useRef<boolean>(true);

  const cartBadge = state.cart.length;

  //calculate um conversions
  useMemo(() => {
    umi = itemDetails.UMI;
    itemDetails.UMM ? umm = itemDetails.UMM : umm = umi;
    itemDetails.UMV ? umv = itemDetails.UMV : umv = umi;
    itemDetails.UMCO1 ? umco1 = parseFloat(itemDetails.UMCO1.replace(/\,/g, '.')) : umco1 = 1;
    itemDetails.UMCO2 ? umco2 = parseFloat(itemDetails.UMCO2.replace(/\,/g, '.')) : umco2 = 1;
    umrel1 = itemDetails.UMREL1;
    umrel2 = itemDetails.UMREL2;
    umrel3 = itemDetails.UMREL3;
    umrel4 = itemDetails.UMREL4;
    qtyi = parseFloat(itemDetails.dispCa.replace(/\,/g, '.'));

    //calculate UM conversion ratio
    switch (umrel1) {
      case 'V':
        if (umrel2 === 'I') {
          conversionRatio = umco1;
        }
        if (umrel2 === 'M') {
          conversionRatio = umco1 * umco2;
        }
        if (umrel2 === '') {
          conversionRatio = 1;
        }
        break;
      case 'M':
        if (umrel2 === 'I') {
          conversionRatio = umco1;
        }
        if (umrel2 === 'V') {
          conversionRatio = umco1 * umco2;
        }
        if (umrel2 === '') {
          conversionRatio = 1;
        }
        break;
      case 'I':
        if (umrel2 === 'M') {
          conversionRatio = umco1;
        }
        if (umrel2 === 'V') {
          conversionRatio = umco1 * umco2;
        }
        if (umrel2 === '') {
          conversionRatio = 1;
        }
        break;
      default:
        conversionRatio = 1;
        break;
    }
    qtyv = +(qtyi / conversionRatio).toFixed(2);
  }, [itemDetails]);

  //get data on page load
  useEffect(() => {
    setLoading(true);
    setError(false);
    setShowPriceHistory(false);
    mounted.current = true;

    const getList = async () => {
      const params = {
        action: 'getItemById',
        codiceArticolo: state.selectedItemId,
        fasciaSconto: state.selectedClient.categoriaSconto,
        user: state.user.name
      }
      try {
        const data = await getDataFromAPI(serverUrl, serverPort, params);
        mounted.current && setItemDetails(data);
      } catch (error) {
        setError(true)
      }
      setLoading(false);
      return () => mounted.current = false;
    }
    getList();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    mounted.current = true;

    const getList = async () => {
      const params = {
        action: ' storicoPrezzi',
        itemId: state.selectedItemId,
        clientId: state.selectedClient.codice,
        user: state.user.name
      }
      try {
        const data = await getDataFromAPI(serverUrl, serverPort, params);
        mounted.current && setPriceArray(data.response);
        console.log(priceArray)
      } catch (error) {
        setError(true)
      }
      setLoading(false);
      return () => mounted.current = false;
    }
    getList();
  }, [showPriceHistory]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ItemListPage" />
          </IonButtons>
          <IonTitle>Dettaglio</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink='/CartListPage'>
              {cartBadge > 0 ? <IonIcon slot="start" icon={cart} /> : <IonIcon slot="start" icon={cartOutline} />}
              {cartBadge > 0 ? <IonBadge color="primary">{cartBadge}</IonBadge> : ''}
            </IonButton>
          </IonButtons>
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
                <IonLabel>Giac. Vendita: <IonText color="medium">{qtyv} {umv}</IonText></IonLabel>
              </IonItem>
              {(umv !== umi) && <IonItem>
                <IonLabel>Giac. Inventariale: <IonText color="medium">{qtyi} {umi} </IonText></IonLabel>
              </IonItem>}
              <IonItem>
                <IonLabel>Prezzo lordo:  <IonText color="medium">€{itemDetails.prezzoLordo} / {umi}</IonText></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Sconto:  <IonText color="medium">{itemDetails.sconto1}  {itemDetails.sconto2 > 0 ? itemDetails.sconto2 : ''}</IonText></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Prezzo netto:  <IonText color="medium">€{itemDetails.prezzoNetto} / {umi}</IonText></IonLabel>
              </IonItem>
            </IonCardContent>
          }
        </IonCard>
        <br />
        <AddToCartModal
          itemId={itemDetails.codiceArticolo}
          itemDescription={itemDetails.descrizione}
          price={parseFloat(itemDetails.prezzoNetto.replace(",", "."))}
          umi={umi}
          umv={umv}
          conversionRatio={conversionRatio}
          available={qtyi}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <IonButton expand="full" onClick={() => setShowModal(true)}><IonIcon slot="start" icon={cartOutline} />Aggiungi al carrello</IonButton><br />
        <IonButton expand="full" onClick={() => setShowPriceHistory(true)}><IonIcon slot="start" icon={timer} />Storico prezzi applicati</IonButton>

        {showPriceHistory && <ItemPriceHistoryList priceArray={priceArray} />}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ItemDetailPage);
