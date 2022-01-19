import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonText
} from '@ionic/react';

import { AppContext } from '../State';

import { CallNumber } from '@ionic-native/call-number';
import { informationCircleOutline } from 'ionicons/icons';

interface Client {
  ragSociale: string | null;
  codice: string | null;
  parIva: string | null;
  categoriaSconto: number | null;
  indirizzo: string | null;
  indirizziAlt: string | null;
  cap: string | null;
  comune: string | null;
  provincia: string | null;
  noTelefono: string | null;
  noCell: string | null;
  noFax: string | null;
  email: string | null;
  categoria: string | null;
  agente: string | null;
  fattCorrente: string | null;
  fattPrecedente: string | null;
  saldoProfessional: string | null;
  stato: number | null;
  pagamento: string | null;
};

interface Props {
  clientArray: Client[];
};

const ClientList = ({ clientArray }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const Call = (phoneNumber: string | null) => {
    phoneNumber && CallNumber.callNumber(phoneNumber, true);
  };

  //set selected client in global state
  const handleClick = (client: Client) => {
    dispatch({
      type: 'setClient',
      client: { ...client }
    });
  };

  return (
    <IonList>
      {clientArray && clientArray.map((client) => (
        <IonItemSliding key={client.codice}>
          <IonItem routerLink='/ClientDetailPage' onClick={() => handleClick(client)} >
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
      ))
      }
    </IonList>

  );
};

export default ClientList;
