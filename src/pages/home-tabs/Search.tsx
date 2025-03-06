import React from 'react';
import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonSearchbar 
} from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonPage>
      {/* Header Section */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Search Bar Content */}
      <IonContent fullscreen className="ion-padding">
        <IonSearchbar animated placeholder="Animated"></IonSearchbar>
      </IonContent>
    </IonPage>
  );
};

export default Search;
