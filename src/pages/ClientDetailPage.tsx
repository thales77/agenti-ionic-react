import React, { useState } from 'react';
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
  IonBackButton
} from '@ionic/react';
import './ClientDetailPage.css';

//test data
import testData from '../testData';

const ClientDetailPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientListPage" />
          </IonButtons>
          <IonTitle>Dettaglio cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol><IonButton>Scheda anagrafica</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton>Storico acquisti</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton>Spese più importanti</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton>Listino</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton>Carello</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton>Storico offerte</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ClientDetailPage;
