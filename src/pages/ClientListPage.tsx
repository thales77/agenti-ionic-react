import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import './ClientListPage.css';
import ClientSearchForm from '../components/ClientSearchForm';
import ClientList from '../components/ClientList';

//test data
import testData from '../testData';

const ClientListPage: React.FC = () => {

  const [loading, setLoading] = useState<Boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton auto-hide="false"></IonMenuButton>
        </IonButtons>
        <ClientSearchForm />
        </IonToolbar>

      </IonHeader>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <IonContent fullscreen>
        <ClientList clientArray={testData.clients} />
      </IonContent>
    </IonPage>
  );
};

export default ClientListPage;
