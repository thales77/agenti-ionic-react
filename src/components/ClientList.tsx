import {
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonText,
  IonIcon
} from '@ionic/react';


import { CallNumber } from '@ionic-native/call-number';
import { informationCircle } from 'ionicons/icons';

type Props = {
  clientArray: {
    ragSociale: string;
    codice: string;
    indirizzo: string;
    cap: string;
    comune: string;
    noTelefono: string;
  }[]
};

const ClientList = ({ clientArray }: Props) => {

  const Call = (phoneNumber: string) => {
    CallNumber.callNumber(phoneNumber, true)
  };

  return (
    <IonList>
      {clientArray.map((client) => (
        <IonItemSliding>
          <IonItem href="#" lines="none">
            <IonLabel>
            <IonText color="dark"><h2>{client.codice} - {client.ragSociale} </h2></IonText>
            <IonText color="dark"><p>{client.indirizzo}</p></IonText>
            <IonText color="medium"><p>{client.cap} {client.comune}</p></IonText>
            </IonLabel>
            <IonIcon icon={informationCircle} slot="start" />
          </IonItem>
          <IonItemOptions side="start">
            <IonItemOption color="primary" onClick={() => Call(client.noTelefono)}>Chiama</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}

    </IonList>

  );
};

export default ClientList;
