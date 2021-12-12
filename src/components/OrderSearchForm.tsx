import React, { useState, useContext, useEffect } from 'react';
import {
  IonItem,
  IonLabel,
  IonDatetime,
  IonText,
  IonPopover
} from '@ionic/react';

import { AppContext } from '../State';
import { format, parseISO } from 'date-fns';

const OrderSearchForm: React.FC = () => {

  let today = new Date();
  let defaultEndDate = today.toISOString();


  let lastMonth = new Date(today.setMonth(today.getMonth() - 2))
  let defaultStartDate = lastMonth.toISOString();


  const [startDate, setStartDate] = useState<string>(defaultStartDate); //IonDateTime ISO format
  const [endDate, setEndDate] = useState<string>(defaultEndDate); //IonDateTime ISO format

  let dateFrom = format(parseISO(startDate), 'yyyy-MM-dd');  //date string, api requires it in this format 
  let dateTo = format(parseISO(endDate), 'yyyy-MM-dd');    //date string, api requires it in this format 

  //global state
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: 'setOrderSearchOptions',
      orderSearchOptions: { dateFrom, dateTo }
    });
  }, [startDate, endDate])

return (
  <>
    {/* Datetime in popover with cover element */}
    <IonItem button={true} id="open-date-from-input">
      <IonLabel>Data inizio</IonLabel>
      <IonText slot="end">{format(parseISO(startDate), 'dd-MM-yyyy')}</IonText>
      <IonPopover trigger="open-date-from-input" showBackdrop={true}>
        <IonDatetime
          presentation="date"
          show-default-buttons
          cancel-text="Annulla"
          done-text="Ok"
          max={endDate}
          onIonChange={e => setStartDate((e.detail.value!))}
        />
      </IonPopover>
    </IonItem>
    {/* Datetime in popover with cover element */}
    <IonItem button={true} id="open-date-to-input">
      <IonLabel>Data fine</IonLabel>
      <IonText slot="end">{format(parseISO(endDate), 'dd-MM-yyyy')}</IonText>
      <IonPopover trigger="open-date-to-input" showBackdrop={true}>
        <IonDatetime
          presentation="date"
          show-default-buttons
          cancel-text="Annulla"
          done-text="Ok"
          min={startDate}
          onIonChange={e => setEndDate((e.detail.value!))}
        />
      </IonPopover>
    </IonItem>
  </>
);
};

export default OrderSearchForm;