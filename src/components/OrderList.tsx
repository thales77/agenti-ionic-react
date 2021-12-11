import { useContext } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';

import { AppContext } from '../State';

import { swapHorizontalOutline } from 'ionicons/icons';


interface Order {
    orderId: string | null;
    dataRegist: string | null;
    descAgente: string | null;
    desCli: string | null;
    totImp: string | null;
    stato: string | null;
}

interface Props {
    orderArray: Order[]
};

const OrderList = ({ orderArray }: Props) => {

      //global state
  const { state, dispatch } = useContext(AppContext);

  const handleClick = ({ orderId }: Order) => {
    dispatch({
      type: 'setOrder',
      orderId
    })
  };

    return (
        <IonList>
            {orderArray.map((order) => (
                <IonItem routerLink='/OrderDetailPage' key={order.orderId} onClick={() => handleClick(order)}>
                    <IonLabel>
                        <IonLabel color="dark"><p>Ordine No: {order.orderId} - Inser. {order.dataRegist}</p></IonLabel>
                        <IonLabel color="dark"><h3>{order.desCli}</h3></IonLabel>
                        <IonLabel color="medium"><p>{order.totImp} + IVA</p></IonLabel>
                        <IonLabel color="medium"><p>Agente: {order.descAgente} </p></IonLabel>
                        <IonLabel color="medium"><p>Stato: {order.stato}</p></IonLabel>
                    </IonLabel>
                    <IonIcon icon={swapHorizontalOutline} slot="start" />
                </ IonItem>
            ))}
        </IonList>
    );
};

export default OrderList;
