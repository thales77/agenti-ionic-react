import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';

import { cardOutline, cardSharp, cart, informationCircle } from 'ionicons/icons';

type Props = {
  itemArray: {
    codiceArticolo: string;
    descrizione: string;
    codForn1: string;
    codForn2: string;
    fornitoreArticolo: string;
    dispTot: string;
    UMI: string;
  }[]
};

const ItemList = ({ itemArray }: Props) => {

  return (
    <IonList>
      {itemArray.map((item) => (
        <IonItem href="/ItemDetailPage" key={item.codiceArticolo}>
          <IonLabel>
            <IonLabel color="dark"><p>{item.codiceArticolo} - {item.codForn1}</p></IonLabel>
            <IonLabel color="dark"><h3>{item.descrizione} </h3></IonLabel>
            <IonLabel color="medium"><p>{item.fornitoreArticolo}</p></IonLabel>
            <IonLabel color="medium"><p>disp: {item.dispTot} {item.UMI}</p></IonLabel>
          </IonLabel>
          <IonIcon icon={cardOutline} slot="start" />
        </IonItem>
      ))}
    </IonList>
  );
};

export default ItemList;
