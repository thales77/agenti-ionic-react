import React, { useState } from 'react';
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
import './ItemDetailPage.css';
import { cartOutline, timer } from 'ionicons/icons';

//test data
import testData from '../testData';

const ItemDetailPage: React.FC = () => {
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
            <IonCardSubtitle color="medium">0181190 - 42/2/Z</IonCardSubtitle>
            <IonCardSubtitle color="dark">BARRA FORATA TONDO D 16X2000 ZIC</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>

      <IonList>
        <IonItem>
          <IonLabel>Giacenza</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prezzo lordo</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Sconti</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prezzo netto</IonLabel>
        </IonItem>
      </IonList>
      
      </IonCardContent>
        </IonCard>
      <IonButton expand="full"><IonIcon slot="start" icon={cartOutline} />Aggiungi al carrello</IonButton>
      <IonButton expand="full"><IonIcon slot="start" icon={timer} />Storico prezzi applicati</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailPage;
