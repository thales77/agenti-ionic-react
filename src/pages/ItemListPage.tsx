import { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonProgressBar,
  IonText,
  IonButton,
  IonIcon,
  IonBadge
} from '@ionic/react';
import './ItemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

import getDataFromAPI from '../utils/getDataFromApi';

import { AppContext } from '../State';

import { cartOutline, cart } from 'ionicons/icons';

const ItemListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [itemArray, setItemArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [listOffset, setListOffset] = useState(0); //TODO
  const [perPage, setPerPage] = useState(50);  //TODO


  const fasciaSconto = state.selectedClient.categoriaSconto;
  const user = state.user.name;
  const action = 'searchItem';
  const itemSearchOptions = JSON.stringify(state.itemSearchOptions);

  const cartBadge = state.cart.length;

  const handleInput = (input: string) => {
    if (input === '') {
      setItemArray([]);
    }
    setSearchTerm(input);
  };

  //api call
  useEffect(() => {
    const getClientList = async () => {
      const params = {
        action: 'searchItem',
        searchTerm,
        itemSearchOptions: JSON.stringify(state.itemSearchOptions),
        fasciaSconto,
        listOffset,
        perPage,
        user: state.user.name
      }
      setLoading(true);
      setError(false);
      if (searchTerm.length > 0) {
        try {
          const data = await getDataFromAPI(serverUrl, serverPort, params);
          setItemArray(data.record);
        } catch (error) {
          setError(true)
        }
      }
      setLoading(false);
    }
    getClientList();
  }, [searchTerm, state.itemSearchOptions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <IonText>{state.selectedClient.ragSociale} </IonText>
          <IonButtons slot="end">
            <IonButton routerLink='/CartListPage'>
              {cartBadge > 0 ? <IonIcon slot="start" icon={cart} /> : <IonIcon slot="start" icon={cartOutline} />}
              {cartBadge > 0 ? <IonBadge color="primary">{cartBadge}</IonBadge> : ''}
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <ItemSearchForm searchTerm={searchTerm} handleInput={handleInput} />
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
        <ItemList itemArray={itemArray} />
      </IonContent>
    </IonPage>
  );
};

export default ItemListPage;
