import React, { useState, useContext } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonProgressBar,
  IonText
} from '@ionic/react';
import './ItemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

import { useDebounce } from '../hooks/useDebounce';

import { Http } from '@capacitor-community/http';

import { AppContext } from '../State';

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
  const itemSearchOptions= JSON.stringify(state.itemSearchOptions);

  const handleInput = (input: string) => {
    if (input === '') {
      setItemArray([]);
    }
    setSearchTerm(input);
  };

  //delay api call using a debounce hook
  useDebounce(async () => {
    const options = {
      url: `http://${serverUrl}:${serverPort}?action=${action}&searchTerm=${searchTerm}&itemSearchOptions=${itemSearchOptions}&listOffset=${listOffset}&perPage=${perPage}&fasciaSconto=${fasciaSconto}&user=${user}`,
      headers: { 'Content-Type': 'application/json' },
      params: {},
    };
    setLoading(true);
    setError(false);
    if (searchTerm.length > 0) {
      try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        const response = JSON.parse(data)
        setItemArray(response.record);
      } catch (error: any) {
        setError(true);
      }
    }
    setLoading(false);
  }, [searchTerm, state.itemSearchOptions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <IonText>Listino {state.selectedClient.ragSociale} </IonText>
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
