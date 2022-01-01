import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';

import { cartOutline } from 'ionicons/icons';

interface Item {
  unique_id: string;
  itemId: string;
  itemDescription: string;
  umi: string;
  umv: string;
  qtyi: number;
  qtyv: number;
  price: number;
  um: string;
  total: number;
  notes: string;
};

interface Props {
  priceArray: Item[]
};

const CartList = ({ priceArray }: Props) => {
  return (
    <IonList>
      {priceArray && priceArray.map((item: Item) => (
        <IonItem key={item.unique_id}>
          <IonLabel>
            <IonLabel color="dark"><p>{item.itemId}</p></IonLabel>
            <IonLabel color="dark"><h3>{item.itemDescription} </h3></IonLabel>
            <IonLabel color="dark"><p>{item.qtyv} {item.umv}
              <IonText color="medium">{(item.qtyv !== item.qtyi) && (' (' + item.qtyi + ' ' + item.umi + ')')}</IonText>  - Prezzo
              <IonText color="primary"> €{item.price} / {item.umi}</IonText></p>
            </IonLabel>
            <IonLabel color="medium"><p></p></IonLabel>
            <IonLabel color="medium"><p>Totale <IonText color="primary">€{item.total}</IonText></p></IonLabel>
          </IonLabel>
          <IonIcon icon={cartOutline} slot="start" />
        </ IonItem>
      ))}
    </IonList>
  );
};

export default CartList;
