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
    IonFooter,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent
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
    let cartTotal = cart.reduce((sum: number, item: Item) => sum + item.total, 0);

    const handleDeleteItem = ({ unique_id }: Item) => {
        dispatch({
            type: 'deleteItemFromCart',
            unique_id
        });
    };

    const handleUpdateItem = ({ unique_id, quantity }: Item) => {
        dispatch({
            type: 'updateItemInCart',
            item: {
                unique_id,
                quantity
            }
        });
    };



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
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Totale carrello: €{cartTotal}</IonCardTitle>
                        <IonCardSubtitle>{state.selectedClient.ragSociale}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                    </IonCardContent>
                </IonCard>
                <IonList>
                    {(cart.length > 0) ?
                        cart.map((item: Item) => {
                            return (
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
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton expand='full'>Invia</IonButton>
                    </IonButtons>
                    <IonButtons >
                        <IonButton expand='full'>Elimina</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton expand='full'>Salva</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonContent>
            <IonFooter collapse="fade">

            </IonFooter>
        </IonModal>
    );
};

export default CartListModal;
