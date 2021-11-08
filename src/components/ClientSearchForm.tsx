import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSearchbar
} from '@ionic/react';
import ClientList from './ClientList';

//Temporary data
import clientArray from '../testData';


const ClientSearchForm: React.FC = () => {

  const [searchTerm, setsearchTerm] = useState<string>();
  const [searchOptions, setSearchOptions] = useState<string[]>(['ragioneSociale']);

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
        <IonItem>
          <IonLabel>Ricerca per</IonLabel>
          <IonSelect multiple={true} value={searchOptions} onIonChange={e => setSearchOptions(e.detail.value)}>
            <IonSelectOption value="ragioneSociale">Ragione Sociale</IonSelectOption>
            <IonSelectOption value="codice">Codice Cliente</IonSelectOption>
            <IonSelectOption value="partitaIva">Partita Iva</IonSelectOption>
            <IonSelectOption value="zona">Zona</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSearchbar value={searchTerm} placeholder={"Cerca... "} onIonChange={e => setsearchTerm(e.detail.value!)}></IonSearchbar>
        </IonItem>
        <IonItem>
          <ClientList clientArray={clientArray} />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ClientSearchForm;
