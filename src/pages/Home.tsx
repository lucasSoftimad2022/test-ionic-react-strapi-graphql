import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { useQuery, gql, useMutation } from "@apollo/client";
import { useData } from "../DataContext";

import './Home.css';
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter, cogSharp } from 'ionicons/icons';
import UserAddModal from '../components/UserAddModal';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';

const CLIENTS = gql`
query getAllClients {clients {data {id,attributes {lastname,firstname,email,notes {data{attributes{score}}}}}}}
  `;

  const ADD_CLIENT_MUTATION = gql`
  mutation createClient(
    $firstname: String!
    $lastname: String!
    $email: String!
    $publishedAt: DateTime!
  ) {
    createClient(
      data: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        publishedAt: $publishedAt
      }
    ) { 
      data{
        id
      }
    }
  }
`;


const ADD_NOTE_MUTATION = gql`
  mutation createNote(
    $client: ID!
    $score: Int!
    $publishedAt: DateTime!
  ) {
    createNote(
      data: {
        client: $client
        score: $score
        publishedAt: $publishedAt
      }
    ) { 
      data{
        id
      }
    }
  }
`;


const Home: React.FC = () => {
  
  const {loading, error, data} = useQuery(CLIENTS);
  const [showAddItem, setShowAddItem] = useState(false);
  const [moyGen, setStateMoyGen] = useState(0);

  const [searchEmail, setSearch] = useState('');
  const [createClient] = useMutation(ADD_CLIENT_MUTATION);
  const [createNote] = useMutation(ADD_NOTE_MUTATION);

  if(loading) return <IonLoading isOpen={loading}></IonLoading>;

  let total = 0;
  let total2 = 0;
  data.clients.data.map((val:any)=>{
    //console.log(val);
    val.attributes.notes.data.map((val2:any) => {
      total += val2.attributes.score;
    });
  });  
  const moyG = (total / data.clients.data.length);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar onIonChange={(e:any) => setSearch(e.target.value!)}></IonSearchbar>
        <IonItem>
          <h1>Moyenne Générale : {moyG.toFixed(2) }</h1>
      </IonItem>
        
        {data && data.clients.data.filter((val:any) => {
            if(searchEmail === "") {
                return val;
            } else if(val.attributes.email.toLowerCase().includes(searchEmail.toLocaleLowerCase())) {
                return val
            }
        }).map((e: any, key:any) => <ListItem data={e.attributes} dataKey={key} key={key} />
        )}
  
        <UserAddModal
          isOpen={showAddItem}
          initialData={null}
          onClose={(resp: any) => {
            
            setShowAddItem(false);
            if(!resp.cancelled){
              createClient({
                variables: {
                  firstname: resp.data?.firstname,
                  lastname: resp.data?.lastname,
                  email: resp.data?.email,
                  publishedAt: new Date()
                }
              }).then(res => {
                if(resp.data){
                  resp.data.notes.map((note:any) =>{
                    createNote({
                      variables: {
                        score: parseInt(note),
                        client: parseInt(res.data.createClient.data.id),
                        publishedAt: new Date().toISOString()
                      }
                    });  
                  });
                }
                window.location.reload();
              });
            }
            
          }}
        />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddItem(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>


      </IonContent>
    </IonPage>
  );
};

export default Home;
