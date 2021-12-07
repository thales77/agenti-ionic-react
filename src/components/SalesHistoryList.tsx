import { useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge
} from '@ionic/react';

import { AppContext } from '../State';

import { cartOutline } from 'ionicons/icons';

interface Sale {
  dataVendita: string | null;
  prezzoVendita: string | null;
  quantitaVendita: string | null;
  filialeVendita: string | null;
  codiceArticolo: string | null;
  DescArt: string | null;
  prezzoMedio: string | null;
  valoreReale: string | null;
};

interface Props {
  salesArray: Sale[]
};

const SalesHistoryList = ({ salesArray }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const handleClick = ({ codiceArticolo }: Sale) => {
    dispatch({
      action: 'setItem',
      itemId: codiceArticolo
    })
  };

  return (
    <IonList>
      {salesArray.map((sale) => (
        <IonItem routerLink='/ItemDetailPage' key={sale.codiceArticolo} onClick={() => handleClick(sale)}>
          <IonLabel>
            <IonLabel ><p>{sale.codiceArticolo}</p></IonLabel>
            <IonLabel color="dark"><p> {sale.DescArt}</p></IonLabel>
            <IonLabel color="dark"><h3>{sale.quantitaVendita} </h3></IonLabel>
          </IonLabel>
          <IonIcon icon={cartOutline} slot="start" />
          <IonBadge slot="end">€ {sale.prezzoVendita} </IonBadge>
        </ IonItem>
      ))}
    </IonList>
  );
};

export default SalesHistoryList;
