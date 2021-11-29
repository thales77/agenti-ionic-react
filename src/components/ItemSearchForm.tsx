import React, { useState, useContext } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/react';

import { AppContext } from '../State';

const ItemSearchForm: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const [searchTerm, setsearchTerm] = useState<string>();
  const [searchOptions, setSearchOptions] = useState<string[]>(['descrizione', 'codiceSider']);

  const handleInput = (searchTerm: string) => {
    dispatch({
      type: 'setSearchTerm',
      search: searchTerm
    });
  };

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
        <IonInput value={state.search} placeholder={"Cerca articolo... "} onIonChange={e => handleInput(e.detail.value!)}></IonInput>
      </IonItem>
    </>
  );
};

export default ItemSearchForm;
