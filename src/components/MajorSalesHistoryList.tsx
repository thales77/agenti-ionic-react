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

const MajorSalesHistoryList = ({ salesArray }: Props) => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  const handleClick = ({ codiceArticolo }: Sale) => {
    console.log(codiceArticolo)
    dispatch({
      type: 'setItem',
      itemId: codiceArticolo
    })
  };

  return (
    <IonList>
      {salesArray.map((sale) => (
        <IonItem routerLink='/ItemDetailPage' onClick={() => handleClick(sale)}  key={sale.codiceArticolo}>
          <IonLabel>
            <IonLabel ><p>{sale.codiceArticolo}</p></IonLabel>
            <IonLabel color="dark"><p> {sale.DescArt}</p></IonLabel>
            <IonLabel color="dark"><p>Quantità {sale.quantitaVendita} </p></IonLabel>
            <IonLabel color="dark"><p>Prezzo medio €{sale.prezzoMedio}</p></IonLabel>
            <IonLabel color="dark"><p>Totale acquisti €{sale.valoreReale}</p></IonLabel>
          </IonLabel>
          <IonIcon icon={cartOutline} slot="start" />
          {/* <IonBadge slot="end">€ {sale.prezzoMedio} </IonBadge> */}
        </ IonItem>
      ))}
    </IonList>
  );
};

export default MajorSalesHistoryList;
