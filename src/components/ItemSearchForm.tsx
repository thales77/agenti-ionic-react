import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/react';

type Props = {
  handleInput: (values: any) => void;
  searchTerm: string;
};

const ItemSearchForm: React.FC<Props> = ({ handleInput, searchTerm }) => {

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
        <IonInput value={searchTerm} placeholder={"Cerca articolo... "}  onIonChange={e => handleInput(e.detail.value!) } clearInput></IonInput>
      </IonItem>
    </>
  );
};

export default ItemSearchForm;
