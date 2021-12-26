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
    IonItemOptions,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonFooter
} from '@ionic/react';


import { AppContext } from '../State';
import { cardOutline, star, create } from 'ionicons/icons';

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

    return (
        <IonModal isOpen={showCartModal}>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowCartModal(false)}>Chiudi</IonButton>
                    </IonButtons>
                    <IonTitle>Carrello</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {(cart.length > 0) ?
                        cart.map((item: Item) => (
                            <IonItemSliding key={item.unique_id}>
                                <IonItem>
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
            </IonContent>
        </IonModal>
    );
};

export default CartListModal;
