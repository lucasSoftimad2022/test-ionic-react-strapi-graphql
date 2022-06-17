import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import { gitNetworkSharp } from "ionicons/icons";
const UserAddModal: React.FunctionComponent<{
  initialData: any;
  isOpen: boolean;
  onClose: Function;
}> = ({ initialData, isOpen, onClose }) => {
  const [formData, setFormData] = useState<any>(initialData);
  const [notes, setNotes] = useState<any[]>([{score: 0}]);

  const addNoteField = () => {
    let newfield = { score: 0 };
    setNotes([...notes, newfield]);
  }
  return (
    <IonModal isOpen={isOpen} id="my-modal" backdropDismiss={false}>
      <IonHeader  >
        <IonToolbar   color="red">
          <IonTitle>Ajouter un client</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nom</IonLabel>
          <IonInput
            value={formData?.lastname}
            onIonChange={(e) =>
              setFormData({ ...formData, lastname: e.detail.value })
            }
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Prénoms</IonLabel>
          <IonInput
            value={formData?.firstname}
            onIonChange={(e) =>
              setFormData({ ...formData, firstname: e.detail.value })
            }
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Email <span>*</span></IonLabel>
          <IonInput
            required={true}
            value={formData?.email}
            onIonChange={(e) =>
              setFormData({ ...formData, email: e.detail.value })
            }
          ></IonInput>
        </IonItem>

        {notes.map((e:any, index) => <IonItem key={index}>
          <IonLabel position="stacked">Note {index+1}</IonLabel>
          <IonInput
            required={true}
            value={formData?.notes ? formData?.notes[index] : 0}
            onIonChange={(e) =>{
              let data = {... formData};
              if(!data.notes){
                data.notes = [];
              }
                data.notes[index] = e.detail.value;
                return setFormData({ ...data});
              }
            }
          ></IonInput>
        </IonItem>)}
        <IonButton size="small" onClick={addNoteField}>+ Ajouter une autre note</IonButton>
        <p></p>
        <IonButton
          fill="outline"
          onClick={() => {
            console.log(formData);
            if(formData && formData.email){
              onClose({ cancelled: false, data: formData });
              setFormData(null);
            }
            
          }}
        >
          SAVE CHANGES
        </IonButton>
        <IonButton
          id="cancelBtn"
          fill="outline"
          onClick={() => {
            onClose({ cancelled: true, data: null });
            setFormData(null);
            setNotes([{score:0}]);
          }}
        >
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default UserAddModal;
