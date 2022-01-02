import React, { useContext } from 'react';
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

const ClientSearchForm: React.FC<Props> = ({ handleInput, searchTerm }) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const handleChange = (options: string[]) => {
    dispatch({
      type: 'setClientSearchOptions',
      clientSearchOptions: options
    });
  };

  return (
    <>
      <IonItem>
        <IonLabel>Ricerca per</IonLabel>
        <IonSelect multiple={true} value={state.clientSearchOptions} onIonChange={e => handleChange(e.detail.value)}>
          <IonSelectOption value="ragioneSociale">Ragione Sociale</IonSelectOption>
          <IonSelectOption value="codiceCliente">Codice Cliente</IonSelectOption>
          <IonSelectOption value="partitaIva">Partita Iva</IonSelectOption>
          <IonSelectOption value="comune">Comune</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput value={searchTerm} placeholder={"Cerca cliente... "} onIonChange={e => handleInput(e.detail.value!)} clearInput debounce={800}></IonInput>
      </IonItem>
    </>
  );
};

export default ClientSearchForm;
