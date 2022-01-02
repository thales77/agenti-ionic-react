import { useContext } from 'react';
import {
    IonItem,
    IonLabel,
    IonIcon,
    IonText,
    IonButton,
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
    IonBackButton,
    IonTextarea
} from '@ionic/react';


import { AppContext } from '../State';
import { sendOutline, saveOutline, trashOutline } from 'ionicons/icons';
import CartList from '../components/CartList';


interface Item {
    unique_id: string;
    itemId: string;
    itemDescription: string;
    umi: string;
    umv: string;
    qtyi: number;
    qtyv: number;
    price: number;
    um: string;
    total: number;
    notes: string;
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

    const handleUpdateItem = ({ unique_id, qtyv }: Item) => {
        dispatch({
            type: 'updateItemInCart',
            item: {
                unique_id,
                qtyv
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

    const setOrderNotes = (notes: string) => {
        dispatch({
            type: 'setOrderNotes',
            notes
        });
    }

    const handleSend = () => {
        //TODO create PDF async
        //open share (android/iphone) menu

    };

    const handleSave = () => {

    };

    const handleDelete = () => {

    };

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/ClientDetailPage" />
                    </IonButtons>
                    <IonTitle >Totale carrello: <IonText color="primary">€{cartTotal}</IonText></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle></IonCardTitle>
                        <IonCardSubtitle>{state.selectedClient.ragSociale}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                    </IonCardContent>
                </IonCard>

                <CartList handleDeleteItem={handleDeleteItem}
                    handleUpdateItem={handleUpdateItem}
                    selectItem={selectItem}
                    cart={cart} />
                <br />
                <IonItem>
                    <IonTextarea placeholder="Note aggiuntive..."
                        debounce={1000}
                        value={state.orderNotes}
                        onIonChange={e => setOrderNotes(e.detail.value!)}>
                    </IonTextarea>
                </IonItem>
            </IonContent>
            <IonFooter translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton expand="full" fill="clear" onClick={() => handleSend}>
                            <IonIcon slot="start" icon={sendOutline} />
                            <IonLabel>Invia</IonLabel>
                        </IonButton>
                        <IonButton expand="full" fill="clear" onClick={() => handleSave}>
                            <IonIcon slot="start" icon={saveOutline} />
                            <IonLabel>Salva</IonLabel>
                        </IonButton>
                        <IonButton expand="full" fill="clear" onClick={() => handleDelete}>
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
