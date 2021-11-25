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
    codiceArticolo: string | null;
    descrizione: string | null;
    codForn1: string | null;
    codForn2: string | null;
    fornitoreArticolo: string | null;
    dispTot: string | null;
    UMI: string | null;
  }[]
};

const ItemList = ({ itemArray }: Props) => {

  return (
    <IonList>
      {itemArray.map((item) => (
          <IonItem routerLink='/ItemDetailPage' key={item.codiceArticolo}>
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
