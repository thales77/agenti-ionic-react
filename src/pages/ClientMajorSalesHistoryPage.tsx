import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import './ClientSalesHistoryPage.css';
import SalesHistoryList from '../components/SalesHistoryList';

//test data
import testData from '../testData';

const ClientMajorSalesHistoryPage: React.FC = () => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/ClientDetailPage" />
        </IonButtons>
        <IonTitle>Spese più importanti</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <SalesHistoryList salesArray={testData.salesHistory} />
    </IonContent>
  </IonPage>
  );
};

export default ClientMajorSalesHistoryPage;
