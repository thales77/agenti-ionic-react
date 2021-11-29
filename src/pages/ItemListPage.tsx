import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonProgressBar
} from '@ionic/react';
import './ItemListPage.css';
import ItemSearchForm from '../components/ItemSearchForm';
import ItemList from '../components/ItemList';

//Temporary data
import testData from '../testData';

import { Http } from '@capacitor-community/http';

import { AppContext } from '../State';

const ItemListPage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);

  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const apiAction = 'searchItem';

  const defaultItemArray = [{
    codiceArticolo: null,
    descrizione: null,
    codForn1: null,
    codForn2: null,
    fornitoreArticolo: null,
    dispTot: null,
    UMI: null
  }]

  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [itemArray, setItemArray] = useState(defaultItemArray);
  const [searchTerm, setSearchTerm] = useState('ipes');
  const [itemSearchOptions, setItemSearchOptions] = useState('["descrizione", "codiceSider"]');
  const [listOffset, setListOffset] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const options = {
    url: `http://${serverUrl}:${serverPort}?action=${apiAction}&searchTerm=${state.search}&itemSearchOptions=${itemSearchOptions}&listOffset=${listOffset}&perPage=${perPage}&fasciaSconto=${state.client.categoriaSconto}&user=${state.user.name}`,
    headers: { 'Content-Type': 'application/json' },
    params: {},
  };

  //get data from API
  const getDataFromAPI = async () => {
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

  //get data on page load
  useEffect(() => {
    getDataFromAPI();
  }, [state.search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ClientDetailPage" />
          </IonButtons>
          <ItemSearchForm />
        </IonToolbar>
      </IonHeader>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <IonContent fullscreen>
        <ItemList itemArray={itemArray} />
      </IonContent>
    </IonPage>
  );
};

export default ItemListPage;
