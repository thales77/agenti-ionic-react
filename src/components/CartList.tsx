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
  handleDeleteItem: ({ unique_id }: Item) => void;
  handleUpdateItem: ({ unique_id, qtyv }: Item) => void;
  selectItem: ({ itemId }: Item) => void;
  cart: Item[];
};

const CartList = ({ handleDeleteItem, handleUpdateItem, selectItem, cart }: Props) => {

  return (
    <IonList>
      {(cart.length > 0) ?
        cart.map((item: Item) => {
          return (
            <IonItemSliding key={item.unique_id}>
              <IonItem routerLink='/ItemDetailPage' onClick={() => selectItem(item)}>
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
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => handleDeleteItem(item)}>Cancella</IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="secondary" onClick={() => handleUpdateItem(item)}>Modifica</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          )
        })
        :
        <IonItem >
          <IonText>Nessun articolo nel carrello</IonText>
        </ IonItem>
      }
    </IonList>
  );
};

export default CartList;
