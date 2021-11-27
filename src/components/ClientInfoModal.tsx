import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader
} from '@ionic/react';

import { AppContext } from '../State';

const ClientInfoModal = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);


  return (
    <>
      <IonList>
        <IonListHeader>
          Anagrafica
        </IonListHeader>
        <IonItem>
          <IonLabel>{state.client.codice} - {state.client.ragSociale}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Partita iva:  {state.client.parIva} </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Indirizzo</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Telefono</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
        </IonItem>
      </IonList>
      <IonList>
        <IonListHeader>
          Informazioni commerciali
        </IonListHeader>
        <IonItem>
          <IonLabel>Fatturato</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Scaduto</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Categoria di sconto</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Modalita di pagamento</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Stato</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Agente</IonLabel>
        </IonItem>
      </IonList>
    </>

  );
};

export default ClientInfoModal;
