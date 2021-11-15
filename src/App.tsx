import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cartOutline, clipboard, clipboardOutline, ellipse, square, swapHorizontalOutline, triangle } from 'ionicons/icons';
import ClientListPage from './pages/ClientListPage';
import ItemListPage from './pages/ItemListPage';
import ClientDetailPage from './pages/ClientDetailPage';
import ItemDetailPage from './pages/ItemDetailPage';
import OrderArchivePage from './pages/OrderArchivePage';
import OrderDetailPage from './pages/OrderDetailPage';


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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/ClientListPage">
            <ClientListPage />
          </Route>
          <Route exact path="/itemListPage">
            <ItemListPage />
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
          <IonTabButton tab="itemListPage" href="/itemListPage">
            <IonIcon icon={cartOutline} />
            <IonLabel>Listino</IonLabel>
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
    </IonReactRouter>
  </IonApp>
);

export default App;
