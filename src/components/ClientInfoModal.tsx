import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader,
  IonText,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonTitle
} from '@ionic/react';
import { CallNumber } from '@ionic-native/call-number';

import { AppContext } from '../State';

interface Props {
  setShowInfoModal: (showInfoModal: boolean) => void;
  showInfoModal: boolean;
};

const ClientInfoModal = ({ setShowInfoModal, showInfoModal }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  let year = new Date().getFullYear();
  let statoCliente: string = '';

  switch (state.selectedClient.stato) {
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

  const Call = (phoneNumber: string | null) => {
    phoneNumber && CallNumber.callNumber(phoneNumber, true);
  };

  return (
    <IonModal isOpen={showInfoModal} >
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowInfoModal(false)}>Chiudi</IonButton>
          </IonButtons>
          <IonTitle>Anagrafica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            Anagrafica
          </IonListHeader>
          <IonItem>
            <IonLabel>{state.selectedClient.codice} - {state.selectedClient.ragSociale}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Partita iva:  <IonText color="medium">{state.selectedClient.parIva} </IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Indirizzo: <IonText color="medium">{state.selectedClient.indirizzo}</IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><IonText color="medium">{state.selectedClient.cap} {state.selectedClient.comune} {state.selectedClient.provincia}</IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonButton fill="outline" onClick={() => Call(state.selectedClient.noTelefono)}>Tel.: {state.selectedClient.noTelefono}</IonButton>
            <IonButton fill="outline" onClick={() => Call(state.selectedClient.noCell)}>Cell.: {state.selectedClient.noCell}</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Email: <IonText color="medium">{state.selectedClient.email}</IonText></IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            Informazioni commerciali
          </IonListHeader>
          <IonItem>
            <IonLabel>Fatturato {year}:  <IonText color="medium">€{state.selectedClient.fattCorrente}</IonText> / {year - 1}: <IonText color="medium">€{state.selectedClient.fattPrecedente}</IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Saldo: <IonText color="medium">€{state.selectedClient.saldoProfessional}</IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pagamento: <IonText color="medium">{state.selectedClient.pagamento}</IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Agente: <IonText color="medium">{state.selectedClient.agente}</IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Categoria:  <IonText color="medium">{state.selectedClient.categoriaSconto}</IonText></IonLabel>
            <IonLabel>Stato: <IonText color="medium">{statoCliente}</IonText></IonLabel>
          </IonItem>
        </IonList>

      </IonContent>
    </IonModal>
  );
};

export default ClientInfoModal;
