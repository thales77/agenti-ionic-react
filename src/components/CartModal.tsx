import { useContext, useState } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonListHeader,
    IonText,
    IonButton,
    IonInput,
    IonNote
} from '@ionic/react';


import { AppContext } from '../State';

interface Props {
    itemId: string;
    itemDescription: string;
    price: number;
    um: string;
    available: number;
};

const CartModal = ({ itemId, itemDescription, price, um, available }: Props) => {

    //global state
    const { state, dispatch } = useContext(AppContext);

    const [total, setTotal] = useState<number>(0);
    const handleQuantityInput = (quantity: number) => {
        quantity ? setTotal(quantity * price) : setTotal(0);
    };

    return (
        <>
            <IonList>
                <IonListHeader>
                    Aggiungi al carrello
                </IonListHeader>
                <IonItem>
                    <IonLabel position="floating">Quantità / {um}</IonLabel>
                    <IonInput type="number" placeholder="Inserisci quantità" onIonChange={e => handleQuantityInput(parseInt(e.detail.value!, 10))} clearInput></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Prezzo: €{price} / {um}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Note</IonLabel>
                    <IonInput placeholder="Aggiungi una nota" onIonChange={e => handleQuantityInput(parseInt(e.detail.value!, 10))}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Totale: €{total} </IonLabel>
                </IonItem>
            </IonList>
        </>
    );
};

export default CartModal;
