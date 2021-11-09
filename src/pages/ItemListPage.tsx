import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './itemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

//Temporary data
import testData from '../testData';

const ItemListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
