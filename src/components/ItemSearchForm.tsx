import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/react';

const ItemSearchForm: React.FC = () => {

  const [searchTerm, setsearchTerm] = useState<string>();
  const [searchOptions, setSearchOptions] = useState<string[]>(['descrizione', 'codiceSider']);

  return (
    <>
      <IonItem>
        <IonLabel>Ricerca per</IonLabel>
        <IonSelect multiple={true} value={searchOptions} onIonChange={e => setSearchOptions(e.detail.value)}>
          <IonSelectOption value="descrizione">Descrizione</IonSelectOption>
          <IonSelectOption value="codiceSider">Codice Interno</IonSelectOption>
          <IonSelectOption value="codiceForn">Codice Fornitore</IonSelectOption>
          <IonSelectOption value="fornitore">Fornitore</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput value={searchTerm} placeholder={"Cerca articolo... "} onIonChange={e => setsearchTerm(e.detail.value!)}></IonInput>
      </IonItem>
    </>
  );
};

export default ItemSearchForm;
