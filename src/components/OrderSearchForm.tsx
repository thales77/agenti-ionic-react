import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/react';

const OrderSearchForm: React.FC = () => {

  const [searchTerm, setsearchTerm] = useState<string>();
  const [searchOptions, setSearchOptions] = useState<string[]>(['ragioneSociale']);

  return (
    <>
      <IonItem>
        <IonLabel>Ricerca per</IonLabel>
        <IonSelect multiple={true} value={searchOptions} onIonChange={e => setSearchOptions(e.detail.value)}>
          <IonSelectOption value="ragioneSociale">Ragione Sociale</IonSelectOption>
          <IonSelectOption value="codiceCliente">Codice Cliente</IonSelectOption>
          <IonSelectOption value="partitaIva">Partita Iva</IonSelectOption>
          <IonSelectOption value="comune">Comune</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput value={searchTerm} placeholder={"Cerca cliente... "} onIonChange={e => setsearchTerm(e.detail.value!)}></IonInput>
      </IonItem>
    </>
  );
};

export default OrderSearchForm;