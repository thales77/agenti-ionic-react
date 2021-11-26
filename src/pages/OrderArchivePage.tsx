import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import './OrderArchivePage.css';
import OrderSearchForm from '../components/OrderSearchForm';
import OrderList from '../components/OrderList';

//test data
import testData from '../testData';

const OrderArchivePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton auto-hide="false"></IonMenuButton>
        </IonButtons>
        <OrderSearchForm />
        </IonToolbar>

      </IonHeader>
      <IonContent fullscreen>
        <OrderList orderArray={testData.orders} />
      </IonContent>
    </IonPage>
  );
};

export default OrderArchivePage;
