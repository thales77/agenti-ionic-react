import { useContext } from 'react';

import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonText,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';

import { cardOutline } from 'ionicons/icons';

interface Item {
  unique_id: string;
  itemId: string;
  itemDescription: string;
  notes: string;
  price: number;
  quantity: number;
  um: string;
  total: number;
};

interface Props {
  handleDeleteItem: ({ unique_id }: Item) => void;
  handleUpdateItem: ({ unique_id, quantity }: Item) => void;
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
                  <IonLabel color="medium"><p>{item.quantity} {item.um}  - €{item.price}</p></IonLabel>
                  <IonLabel color="medium"><p></p></IonLabel>
                  <IonLabel color="medium"><p>Totale €{item.total}</p></IonLabel>
                </IonLabel>
                <IonIcon icon={cardOutline} slot="start" />
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
