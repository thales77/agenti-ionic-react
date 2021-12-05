import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader,
  IonText
} from '@ionic/react';

import { AppContext } from '../State';

const ClientInfoModal = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  let year = new Date().getFullYear();
  let statoCliente: string = '';

  switch (state.client.stato) {
    case 0:
      statoCliente = 'Attivo'
      break;

    case -1:
      statoCliente = 'Contenzioso'
      break;

    case -2:
      statoCliente = 'Bloccato'
      break;

    default:
      statoCliente = 'Non conosciuto'
      break;
  }


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
          <IonLabel>Partita iva:  <IonText color="medium">{state.client.parIva} </IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Indirizzo: <IonText color="medium">{state.client.indirizzo}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel><IonText color="medium">{state.client.cap} {state.client.comune} {state.client.provincia}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Telefono: <IonText color="medium">{state.client.noTelefono}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Cell: <IonText color="medium">{state.client.noCell}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Email: <IonText color="medium">{state.client.email}</IonText></IonLabel>
        </IonItem>
      </IonList>
      <IonList>
        <IonListHeader>
          Informazioni commerciali
        </IonListHeader>
        <IonItem>
          <IonLabel>Fatturato {year}:  <IonText color="medium">€{state.client.fattCorrente}</IonText> / {year - 1}: <IonText color="medium">€{state.client.fattPrecedente}</IonText>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Saldo: <IonText color="medium">€{state.client.saldoProfessional}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Categoria di sconto:  <IonText color="medium">{state.client.categoriaSconto}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pagamento: <IonText color="medium">{state.client.pagamento}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Stato: <IonText color="medium">{statoCliente}</IonText></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Agente: <IonText color="medium">{state.client.agente}</IonText></IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default ClientInfoModal;
