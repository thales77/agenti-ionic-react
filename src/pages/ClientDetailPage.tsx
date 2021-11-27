import React, { useState, useContext } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonModal,
  IonItem,
  IonText
} from '@ionic/react';

import { AppContext } from '../State';

import './ClientDetailPage.css';

import { calculatorOutline, calendar, cartOutline, cash, folderOpen, timer } from 'ionicons/icons';
import ClientInfoModal from '../components/ClientInfoModal';

const ClientDetailPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //local state
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientListPage" />
          </IonButtons>
          <IonText>{state.client.codice} - {state.client.ragSociale}</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol><IonButton expand="full" onClick={() => setShowModal(true)}>
              <IonIcon slot="start" icon={folderOpen} />
              Scheda anagrafica
            </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink='/ClientSalesHistoryPage' expand="full">
                <IonIcon slot="start" icon={calendar} />
                Storico acquisti
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink='/ClientMajorSalesHistoryPage' expand="full">
                <IonIcon slot="start" icon={cash} />
                Spese più importanti
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton routerLink='/ItemListPage' expand="full">
              <IonIcon slot="start" icon={calculatorOutline} />
              Listino
            </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton expand="full">
              <IonIcon slot="start" icon={cartOutline} />
              Carrello
            </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton expand="full" >
              <IonIcon slot="start" icon={timer} />
              Carrelli salvati
            </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showModal} cssClass='my-custom-class'>
          <ClientInfoModal />
          <IonButton onClick={() => setShowModal(false)}>Chiudi</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ClientDetailPage;
