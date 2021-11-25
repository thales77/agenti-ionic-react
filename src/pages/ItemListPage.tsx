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
import './ItemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

//Temporary data
import testData from '../testData';

const ItemListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <ItemSearchForm />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ItemList itemArray={testData.items} />
      </IonContent>
    </IonPage>
  );
};

export default ItemListPage;
