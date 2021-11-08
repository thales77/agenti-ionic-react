import {
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

type Props = {
  clientArray: {
    ragSociale: string;
    codice: string;
  }[]
};

const ClientList = ({ clientArray }: Props) => {

  return (
    <IonList>
      {clientArray.map((client) => (
        <IonItem>
          <IonLabel>{client.codice} - {client.ragSociale}</IonLabel>
        </IonItem>
      ))}
    </IonList>

  );
};

export default ClientList;
