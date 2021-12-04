import React, { useState, useContext } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/react';

import { AppContext } from '../State';

type Props = {
  handleInput: (values: any) => void;
  searchTerm: string;
};

const ItemSearchForm: React.FC<Props> = ({ handleInput, searchTerm }) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const handleChange = (options: Array<String>) => {
    dispatch({
      type: 'setSearchOptions',
      item: {
        searchOptions: options
      }
    });
  };

  return (
    <>
      <IonItem>
        <IonLabel>Ricerca per</IonLabel>
        <IonSelect multiple={true} value={state.item.searchOptions} onIonChange={e => handleChange(e.detail.value)}>
          <IonSelectOption value="descrizione">Descrizione</IonSelectOption>
          <IonSelectOption value="codiceSider">Codice Interno</IonSelectOption>
          <IonSelectOption value="codiceForn">Codice Fornitore</IonSelectOption>
          <IonSelectOption value="fornitore">Fornitore</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput value={searchTerm} placeholder={"Cerca articolo... "} onIonChange={e => handleInput(e.detail.value!)} clearInput></IonInput>
      </IonItem>
    </>
  );
};

export default ItemSearchForm;
