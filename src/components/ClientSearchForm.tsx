import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput
} from '@ionic/react';
import ClientList from './ClientList';

//Temporary data
import clientArray from '../testData';


const ClientSearchForm: React.FC = () => {

  const [searchTerm, setsearchTerm] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ricerca clienti</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ricerca Clienti</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonInput value={searchTerm} placeholder="Inserisci ragione sociale" onIonChange={e => setsearchTerm(e.detail.value!)} clearInput></IonInput>
        </IonItem>
        <IonItem>
          <ClientList clientArray={clientArray}/>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ClientSearchForm;
