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
    IonToolbar,
    IonHeader,
    IonButtons,
    IonTitle,
    IonContent,
    useIonToast
} from '@ionic/react';


import { AppContext } from '../State';
//import { settingsOutline } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

interface Props {
    itemId: string;
    itemDescription: string;
    price: number;
    um: string;
    available: number;
    setShowModal: (showModal: boolean) => void;
    showModal: boolean;
};

const AddToCartModal = ({ itemId, itemDescription, price, um, available, setShowModal, showModal }: Props) => {

    //global state
    const { state, dispatch } = useContext(AppContext);

    const [present, dismiss] = useIonToast();

    const [total, setTotal] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');

    const unique_id = uuid();

    const handleQuantityInput = (quantity: number) => {

        if (!quantity) {
            setTotal(0);
            return;
        }

        setTotal(+(quantity * price).toFixed(2));
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
                unique_id,
                itemId,
                itemDescription,
                price,
                um,
                quantity,
                total,
                notes
            }
        });
        setShowModal(false);
        present('Articolo aggiunto nel carrello', 2000)
    };

    return (

        <IonModal isOpen={showModal}>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(false)}>Chiudi</IonButton>
                    </IonButtons>
                    <IonTitle>Aggiungi al carrello</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Quantità / {um}</IonLabel>
                        <IonInput inputmode="decimal"
                            placeholder="Inserisci quantità"
                            onIonChange={e => handleQuantityInput(parseFloat(e.detail.value!))}
                            clearInput
                            autofocus
                            required
                        >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Prezzo: €{price} / {um}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Note</IonLabel>
                        <IonInput placeholder="Aggiungi una nota"
                            onIonChange={e => handleNoteInput(e.detail.value!)}
                            inputmode="text"
                        >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Totale: €{total} </IonLabel>
                    </IonItem>
                </IonList>
                <br />
                <IonButton expand="full" onClick={() => handleAddItem()}>Aggiungi</IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddToCartModal;
