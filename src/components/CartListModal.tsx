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
    IonNote,
    IonModal,
    IonItemSliding,
    IonItemOption,
    IonItemOptions
} from '@ionic/react';


import { AppContext } from '../State';
import { cardOutline } from 'ionicons/icons';

interface Props {
    setShowCartModal: (showCartModal: boolean) => void;
    showCartModal: boolean;
};

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

const CartListModal = ({ setShowCartModal, showCartModal }: Props) => {

    //global state
    const { state, dispatch } = useContext(AppContext);

    let cart = state.cart;
    //set selected item in global state
    const selectItem = ({ itemId }: Item) => {
        dispatch({
            type: 'setItem',
            itemId,
        });
    };

    return (
        <IonModal isOpen={showCartModal}>
            <IonList>
                <IonListHeader>
                    Carrello
                </IonListHeader>
                {(cart.length > 0) ?
                    cart.map((item: Item) => (
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
                                <IonItemOption color="danger" onClick={() => null}>Cancella</IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="secondary" onClick={() => null}>Modifica</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                    :
                    <IonItem >
                        <IonText>Nessun articolo nel carrello</IonText>
                    </ IonItem>
                }
            </IonList>
            <br />
            <IonButton expand="full" onClick={() => setShowCartModal(false)}>Annulla</IonButton>
        </IonModal>
    );
};

export default CartListModal;
