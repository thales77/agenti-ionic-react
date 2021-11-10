import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader
} from '@ionic/react';


const ClientInfoModal = () => {

  return (
    <>
      <IonList>
        <IonListHeader>
          Anagrafica
        </IonListHeader>
        <IonItem>
          <IonLabel>Codice - Partita Iva</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Ragione sociale</IonLabel>
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
