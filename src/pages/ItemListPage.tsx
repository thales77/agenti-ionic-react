import React, { useState, useContext, useEffect } from 'react';
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


import { Http } from '@capacitor-community/http';

import { AppContext } from '../State';

const ItemListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const apiAction = 'searchItem';


  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [itemArray, setItemArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemSearchOptions, setItemSearchOptions] = useState('["descrizione", "codiceSider"]');
  const [listOffset, setListOffset] = useState(0);
  const [perPage, setPerPage] = useState(50);

  useEffect(() => {
    //get data from API
    const getDataFromAPI = async () => {
      const options = {
        url: `http://${serverUrl}:${serverPort}?action=${apiAction}&searchTerm=${searchTerm}&itemSearchOptions=${itemSearchOptions}&listOffset=${listOffset}&perPage=${perPage}&fasciaSconto=${state.client.categoriaSconto}&user=${state.user.name}`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
      };
      setLoading(true);
      setError(false);
      try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        const response = JSON.parse(data)
        setItemArray(response.record);
      } catch (error: any) {
        setError(true);
      }
      setLoading(false);
    };

    if (searchTerm.length > 3) {
      getDataFromAPI();
    }
  }, [searchTerm]);

  const handleInput = (searchTerm: string) => {
    if (searchTerm.length === 0)
    {
      setItemArray([]);
      setSearchTerm('');
    }
    //only start api call after 3 characters have been typed
    if (searchTerm.length > 3) {
      setSearchTerm(searchTerm);
    };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <IonText>Listino {state.client.ragSociale} </IonText>
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
