import { Redirect, Route } from 'react-router-dom';
import {
  setupIonicReact,
  isPlatform,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';

import { AppContextProvider } from './State';

import { IonReactRouter } from '@ionic/react-router';
import { clipboardOutline, swapHorizontalOutline } from 'ionicons/icons';
import ClientListPage from './pages/ClientListPage';
import ItemListPage from './pages/ItemListPage';
import ClientDetailPage from './pages/ClientDetailPage';
import ItemDetailPage from './pages/ItemDetailPage';
import OrderArchivePage from './pages/OrderArchivePage';
import OrderDetailPage from './pages/OrderDetailPage';
import ClientSalesHistoryPage from './pages/ClientSalesHistoryPage';
import ClientMajorSalesHistoryPage from './pages/ClientMajorSalesHistoryPage';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//Global Config​
const getConfig = () => {
  
  let config: any = {
    mode: 'md',
  };

  /*if (isPlatform('iphone')) {
    config = {
      ...config,
      backButtonText: 'Previous',
    };
  }*/
  return config;
};
setupIonicReact(getConfig());

const App: React.FC = () => (
  <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/ClientListPage">
              <ClientListPage />
            </Route>
            <Route exact path="/OrderArchivePage">
              <OrderArchivePage />
            </Route>
            <Route exact path="/">
              <Redirect to="/ClientListPage" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="ClientListPage" href="/ClientListPage">
              <IonIcon icon={clipboardOutline} />
              <IonLabel>Clienti</IonLabel>
            </IonTabButton>
            <IonTabButton tab="OrderArchivePage" href="/OrderArchivePage">
              <IonIcon icon={swapHorizontalOutline} />
              <IonLabel>Archivio offerte</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        <Route exact path="/ClientDetailPage">
          <ClientDetailPage />
        </Route>
        <Route exact path="/ItemDetailPage">
          <ItemDetailPage />
        </Route>
        <Route exact path="/OrderDetailPage">
          <OrderDetailPage />
        </Route>
        <Route exact path="/ClientSalesHistoryPage">
          <ClientSalesHistoryPage />
        </Route>
        <Route exact path="/ClientMajorSalesHistoryPage">
          <ClientMajorSalesHistoryPage />
        </Route>
        <Route exact path="/ItemListPage">
          <ItemListPage />
        </Route>
      </IonReactRouter>
    </IonApp>
  </ AppContextProvider>
);

export default App;
