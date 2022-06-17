import { IonItem, IonLabel, IonText } from "@ionic/react";
import React from "react";
  const ListItem: React.FC<any> = ({ data , dataKey}) => {
  let sumMoy = 0;
  //console.log("ListItem", data);
  return (
    <IonItem key={dataKey}>
      <IonLabel>
        <h1>{data?.firstname} {data?.lastname}</h1>
        <div className="ion-text-wrap">
          <IonText>{data?.email}</IonText>
        </div>
        <div
          className="ion-text-wrap"
          style={{ paddingTop: 6, fontStyle: "italic" }}
        >
          {/* <IonText>{data.id}</IonText> */}
        </div>
        <div
          className="ion-text-wrap"
          style={{ paddingTop: 6, fontStyle: "italic" }}
        >
        
        </div>
        <div
          className="ion-text-wrap"
          style={{ paddingTop: 6, fontStyle: "italic" }}
        >
          {data.notes.data.map((e:any, key:any) => {
            sumMoy += e.attributes.score;
            return <div key={key}>Note: {e.attributes.score}</div>
          })}
          <div>Moyenne note du client : { sumMoy }</div>
        </div>
      </IonLabel>
    </IonItem>
  );
};


export default React.memo(ListItem)