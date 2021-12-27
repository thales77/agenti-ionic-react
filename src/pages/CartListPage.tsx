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
    IonCardContent,
    IonPage,
    IonBackButton
} from '@ionic/react';


import { AppContext } from '../State';
import { sendOutline, saveOutline, trashOutline } from 'ionicons/icons';
import CartList from '../components/CartList';


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

const CartListPage: React.FC = () => {

    //global state
    const { state, dispatch } = useContext(AppContext);

    let cart = state.cart;
    let cartTotal = cart.reduce((sum: number, item: Item) => sum + item.total, 0).toFixed(2);

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

    //set selected item in global state
    const selectItem = ({ itemId }: Item) => {
        dispatch({
            type: 'setItem',
            itemId
        });
    };

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/ClientDetailPage" />
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
                <CartList handleDeleteItem={handleDeleteItem}
                    handleUpdateItem={handleUpdateItem}
                    selectItem={selectItem}
                    cart={cart} />
            </IonContent>
            <IonFooter translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton expand="full" fill="clear">
                            <IonIcon slot="start" icon={sendOutline} />
                            <IonLabel>Invia</IonLabel>
                        </IonButton>
                        <IonButton expand="full" fill="clear">
                            <IonIcon slot="start" icon={saveOutline} />
                            <IonLabel>Salva</IonLabel>
                        </IonButton>
                        <IonButton expand="full" fill="clear">
                            <IonIcon slot="start" icon={trashOutline} />
                            <IonLabel>Cancella</IonLabel>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default CartListPage;
