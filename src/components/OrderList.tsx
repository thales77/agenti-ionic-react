import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';

import { swapHorizontalOutline } from 'ionicons/icons';

type Props = {
    orderArray: {
        orderId: string;
        dataRegist: string;
        descAgente: string;
        desCli: string;
        totImp: string;
        stato: string;
    }[]
};

const OrderList = ({ orderArray }: Props) => {

    return (
        <IonList>
            {orderArray.map((order) => (
                <IonItem href="/OrderDetailPage" key={order.orderId}>
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