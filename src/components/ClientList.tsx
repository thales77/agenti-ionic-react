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

interface Props {
  clientArray: {
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
  }[]
};

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
      client: {
        ragSociale: client.ragSociale,
        codice: client.codice,
        parIva: client.parIva,
        categoriaSconto: client.categoriaSconto,
        indirizzo: client.indirizzo,
        indirizziAlt: client.indirizziAlt,
        cap: client.cap,
        comune: client.comune,
        provincia: client.provincia,
        noTelefono: client.noTelefono,
        noCell: client.noCell,
        noFax: client.noFax,
        email: client.email,
        categoria: client.categoria,
        agente: client.agente,
        fattCorrente: client.fattCorrente,
        fattPrecedente: client.fattPrecedente,
        saldoProfessional: client.saldoProfessional,
        stato: client.stato,
        pagamento: client.pagamento,
      }
    });
  };

  return (
    <IonList>
      {(clientArray.length > 0) ?
        clientArray.map((client) => (
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
        :
        <IonItem >
          <IonText>No records</IonText>
        </ IonItem>
      }

    </IonList>

  );
};

export default ClientList;
