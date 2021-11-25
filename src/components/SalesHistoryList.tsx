import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge
} from '@ionic/react';

import { cardOutline, cardSharp, cart, cartOutline, informationCircle } from 'ionicons/icons';

type Props = {
  salesArray: {
    dataVendita: string | null;
    prezzoVendita: string | null;
    quantitaVendita: string | null;
    filialeVendita: string | null;
    codiceArticolo: string | null;
    DescArt: string | null;
    prezzoMedio: string | null;
    valoreReale: string | null;
  }[]
};

const SalesHistoryList = ({ salesArray }: Props) => {

  return (
    <IonList>
      {salesArray.map((sale) => (
        <IonItem routerLink='/ItemDetailPage' key={sale.codiceArticolo}>
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
