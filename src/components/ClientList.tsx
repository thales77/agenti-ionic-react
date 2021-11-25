import {
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/react';

import { CallNumber } from '@ionic-native/call-number';
import { informationCircleOutline } from 'ionicons/icons';

type Props = {
  clientArray: {
    ragSociale: string | null;
    codice: string | null;
    indirizzo: string | null;
    cap: string | null;
    comune: string | null;
    noTelefono: string | null;
  }[]
};


const ClientList = ({ clientArray }: Props) => {

  const Call = (phoneNumber: string | null) => {
    phoneNumber && CallNumber.callNumber(phoneNumber, true);
  };

  return (
    <IonList>
      {clientArray.map((client) => (
        <IonItemSliding key={client.codice}>
          <IonItem routerLink='/ClientDetailPage'>
            <IonLabel>
              <IonLabel color="dark"><p>{client.codice}</p></IonLabel>
              <IonLabel color="dark"><h3>{client.ragSociale} </h3></IonLabel>
              <IonLabel color="dark"><p>{client.indirizzo}</p></IonLabel>
              <IonLabel color="medium"><p>{client.cap} {client.comune}</p></IonLabel>
            </IonLabel>
            <IonIcon icon={informationCircleOutline} slot="start" />
          </IonItem>
          {client.noTelefono ?
            <IonItemOptions side="start">
              <IonItemOption color="primary" onClick={() => Call(client.noTelefono)}>Chiama</IonItemOption>
            </IonItemOptions> : ''}
        </IonItemSliding>
      ))}

    </IonList>

  );
};

export default ClientList;
