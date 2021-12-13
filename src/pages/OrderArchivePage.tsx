import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonText,
  IonProgressBar
} from '@ionic/react';
import './OrderArchivePage.css';

import { Http } from '@capacitor-community/http';

import OrderSearchForm from '../components/OrderSearchForm';
import OrderList from '../components/OrderList';

import { format, parseISO } from 'date-fns';
import { AppContext } from '../State';

const OrderArchivePage: React.FC = () => {

  //global state
  const { state, dispatch } = useContext(AppContext);
  //see .env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverPort = process.env.REACT_APP_SERVER_PORT;

  //local state
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [orderArray, setOrderArray] = useState([]);
  const [listOffset, setListOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const user = state.user.name; 
  const action = 'getOrderList';
  const idAgente = 9999; //TODO
  let dateFrom = format(parseISO(state.orderSearchOptions.startDate), 'yyyy-MM-dd');  //date string, api requires it in this format 
  let dateTo = format(parseISO(state.orderSearchOptions.endDate), 'yyyy-MM-dd');    //date string, api requires it in this format 
  
  useEffect(() => {
    const getData = async () => {
      const options = {
        url: `http://${serverUrl}:${serverPort}?action=${action}&datefrom=${dateFrom}&dateto=${dateTo}&idAgente=${idAgente}&user=${user}&listOffset=${listOffset}&perPage=${perPage}`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
      };

      setLoading(true);
      setError(false);
      try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        const response = JSON.parse(data)
        setOrderArray(response);
      } catch (error: any) {
        setError(true);
      }
      setLoading(false);
    };
    getData();
  }, [state.orderSearchOptions.startDate, state.orderSearchOptions.endDate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <OrderSearchForm />
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
      {error ? <IonText color="danger">Errore recupero dati</IonText> : <OrderList orderArray={orderArray} />}
      </IonContent>
    </IonPage>
  );
};

export default OrderArchivePage;
