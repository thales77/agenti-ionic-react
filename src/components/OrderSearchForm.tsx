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

  //global state
  const { state, dispatch } = useContext(AppContext);

  const [startDate, setStartDate] = useState<string>(state.orderSearchOptions.startDate); //IonDateTime ISO format
  const [endDate, setEndDate] = useState<string>(state.orderSearchOptions.endDate); //IonDateTime ISO format

  useEffect(() => {
    dispatch({
      type: 'setOrderSearchOptions',
      orderSearchOptions: { startDate, endDate }
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