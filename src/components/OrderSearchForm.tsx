import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonDatetime
} from '@ionic/react';

const OrderSearchForm: React.FC = () => {

  let today = new Date();
  let defaultEndDate = today.toISOString(); 
  
  let lastMonth = new Date(today.setMonth(today.getMonth() - 1))
  let defaultStartDate = lastMonth.toISOString();


  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);

  return (
    <>
      <IonItem>
        <IonLabel>Ordini inseriti dal</IonLabel>
        <IonDatetime
          //displayFormat="DD MMM YYYY"
          //pickerFormat="DD MMM YYYY"
          placeholder="Data inizio"
          //monthShortNames="gen, feb, mar, apr, mag, jun, jul, ago, set, ott, nov, dic"
          //dayShortNames="Lun, Mar, Mer, Gio, Ven, Sab, Dom"
          cancelText="Annulla"
          doneText="Ok"
          value={startDate} onIonChange={e => setStartDate(e.detail.value!)}
        >
        </IonDatetime>
      </IonItem>
      <IonItem>
        <IonLabel>al</IonLabel>
        <IonDatetime
          //displayFormat="DD MMM YYYY"
          //pickerFormat="DD MMM YYYY"
          placeholder="Data fine"
          //monthShortNames="gen, feb, mar, apr, mag, jun, jul, ago, set, ott, nov, dic"
          //dayShortNames="Lun, Mar, Mer, Gio, Ven, Sab, Dom"
          cancelText="Annulla"
          doneText="Ok"
          value={endDate} onIonChange={e => setEndDate(e.detail.value!)}
        >
        </IonDatetime>
      </IonItem>
    </>
  );
};

export default OrderSearchForm;