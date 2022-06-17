import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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

import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import Home from './pages/Home';

setupIonicReact();

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:1337/graphql'}),
  cache: new InMemoryCache()
});

const App: React.FC = () => (
  <IonApp>
    
      <IonReactRouter>
        <IonRouterOutlet>
          <ApolloProvider client={client}>
            <Route path="/" exact component={Home}>
            </Route>
          </ApolloProvider>
        </IonRouterOutlet>
      </IonReactRouter>
  </IonApp>
);

export default App;
