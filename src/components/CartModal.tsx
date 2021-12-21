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
    IonModal
} from '@ionic/react';


import { AppContext } from '../State';
import { settingsOutline } from 'ionicons/icons';

interface Props {
    itemId: string;
    itemDescription: string;
    price: number;
    um: string;
    available: number;
    setShowModal: (showModal: boolean) => void;
    showModal: boolean;
};

const CartModal = ({ itemId, itemDescription, price, um, available, setShowModal, showModal }: Props) => {

    //global state
    const { state, dispatch } = useContext(AppContext);

    const [total, setTotal] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');

    const handleQuantityInput = (quantity: number) => {

        if (!quantity) {
            setTotal(0);
            return;
        }

        setTotal(quantity * price);
        setQuantity(quantity);

    };

    const handleNoteInput = (notes: string) => {
        if (!notes) {
            setNotes('');
            return;
        }
        setNotes(notes);
    };

    const handleAddItem = () => {
        dispatch({
            type: 'addItemToCart',
            item: {
                itemId,
                itemDescription,
                price,
                um,
                quantity,
                total,
                notes
            }
        });
    };

    return (

        <IonModal isOpen={showModal}>
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
                    <IonInput placeholder="Aggiungi una nota" onIonChange={e => handleNoteInput(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Totale: €{total} </IonLabel>
                </IonItem>
            </IonList>
            <br />
            <IonButton expand="full" onClick={() => handleAddItem()}>Aggiungi</IonButton><br />
            <IonButton expand="full" onClick={() => setShowModal(false)}>Annulla</IonButton>

        </IonModal>
    );
};

export default CartModal;
