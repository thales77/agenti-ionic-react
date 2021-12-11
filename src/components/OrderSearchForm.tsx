import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonDatetime,
  IonText,
  IonPopover
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
      {/* Datetime in popover with cover element */}
      <IonItem button={true} id="open-date-from-input">
        <IonLabel>Data inizio</IonLabel>
        <IonText slot="end">{startDate}</IonText>
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
        <IonText slot="end">{endDate}</IonText>
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