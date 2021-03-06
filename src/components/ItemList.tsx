import { useContext } from 'react';

import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonText
} from '@ionic/react';

import { AppContext } from '../State';

import { cardOutline, cardSharp, cart, cartOutline, informationCircle } from 'ionicons/icons';

interface Item {
  codiceArticolo: string | null;
  descrizione: string | null;
  codForn1: string | null;
  codForn2: string | null;
  fornitoreArticolo: string | null;
  dispTot: string | null;
  UMI: string | null;
};

interface Props {
  itemArray: Item[]
};

const ItemList = ({ itemArray }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //set selected item in global state
  const selectItem = ({ codiceArticolo }: Item) => {
    dispatch({
      type: 'setItem',
      itemId: codiceArticolo,
    });
  };

  return (
    <IonList>
      {itemArray && itemArray.map((item) => (
        <IonItem routerLink='/ItemDetailPage' onClick={() => selectItem(item)} key={item.codiceArticolo}>
          <IonLabel>
            <IonLabel color="dark"><p>{item.codiceArticolo} {item.codForn1 ? ' - ' : ''} {item.codForn1}</p></IonLabel>
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
