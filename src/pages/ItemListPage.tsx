import { useState, useContext, useEffect, useRef } from 'react';
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
import './itemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

import getDataFromAPI from '../services/getDataFromApi';

import { AppContext } from '../State';

import { cartOutline, cart } from 'ionicons/icons';

const ItemListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [itemArray, setItemArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [listOffset, setListOffset] = useState<number>(0); //TODO
  const [perPage, setPerPage] = useState<number>(50);  //TODO
  const mounted = useRef<boolean>(true);

  const fasciaSconto = state.selectedClient.categoriaSconto;
  const user = state.user.name;
  const action = 'searchItem';
  const itemSearchOptions = JSON.stringify(state.itemSearchOptions);

  const cartBadge = state.cart.length;

  const handleInput = (input: string) => {
    mounted.current && setSearchTerm(input);
  };

  //api call
  useEffect(() => {
    const getList = async () => {
      mounted.current = true;
      setLoading(true);
      setError(false);
      const params = {
        action: 'searchItem',
        searchTerm,
        itemSearchOptions: JSON.stringify(state.itemSearchOptions),
        fasciaSconto,
        listOffset,
        perPage,
        user: state.user.name
      }

      if (searchTerm.length > 0) {
        try {
          const data = await getDataFromAPI(serverUrl, serverPort, params);
          mounted.current && setItemArray(data.record);
        } catch (error) {
          setError(true)
        }
      }
      setLoading(false);
      return () => mounted.current = false;
    }
    getList();
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
