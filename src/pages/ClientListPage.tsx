import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './ClientListPage.css';
import ClientSearchForm from '../components/ClientSearchForm';
import ClientList from '../components/ClientList';

//test data
import testData from '../testData';

const ClientListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <ClientSearchForm />
        </IonToolbar>

      </IonHeader>
      <IonContent fullscreen>
        <ClientList clientArray={testData.clients} />
      </IonContent>
    </IonPage>
  );
};

export default ClientListPage;
