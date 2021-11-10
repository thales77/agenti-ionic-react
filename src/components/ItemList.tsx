import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge
} from '@ionic/react';

import { cardOutline, cardSharp, cart, cartOutline, informationCircle } from 'ionicons/icons';

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
            </IonLabel>
            <IonIcon icon={cardOutline} slot="start" />
            <IonBadge slot="end">{item.dispTot} {item.UMI}</IonBadge>
          </ IonItem>
      ))}
    </IonList>
  );
};

export default ItemList;
