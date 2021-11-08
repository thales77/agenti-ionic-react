import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './ClientPage.css';
import ClientSearchForm from '../components/ClientSearchForm';

const ClientPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clienti</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clienti</IonTitle>
          </IonToolbar>
        </IonHeader>

      <ClientSearchForm />

      </IonContent>
    </IonPage>
  );
};

export default ClientPage;
