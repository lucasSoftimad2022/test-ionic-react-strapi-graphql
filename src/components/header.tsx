import { IonItem, IonLabel, IonList } from '@ionic/react';

function NavBar(){

    return (
        <IonList>
            <IonItem routerLink="/">
                <IonLabel>Liste des clients</IonLabel>
            </IonItem>
            <IonItem routerLink="/addClient">
                <IonLabel>Ajout client</IonLabel>
            </IonItem>
        </IonList>
    )
}

export default NavBar;