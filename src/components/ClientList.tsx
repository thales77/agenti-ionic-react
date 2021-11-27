import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/react';

import { AppContext } from '../State';


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
    parIva: string | null;
    categoriaSconto: number | null;
  }[]
};


const ClientList = ({ clientArray }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const Call = (phoneNumber: string | null) => {
    phoneNumber && CallNumber.callNumber(phoneNumber, true);
  };

  //set selected client in global state
  const selectClient = (client: {codice: string | null, ragSociale: string | null, parIva: string | null, categoriaSconto: number | null}) => {
    dispatch({
      type: 'setClient',
      client: {
        codice: client.codice,
        ragSociale: client.ragSociale,
        parIva: client.parIva,
        categoriaSconto: client.categoriaSconto
      }
    });
  };

  return (
    <IonList>
      {clientArray.map((client) => (
        <IonItemSliding key={client.codice}>
          <IonItem routerLink='/ClientDetailPage' onClick={() => selectClient(client)} >
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
