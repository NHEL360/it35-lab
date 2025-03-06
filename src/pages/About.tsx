import React from 'react';
import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonButton,  
    IonPopover
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      {/* Header Section */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content Section */}
      <IonContent fullscreen className="ion-padding">
        {/* Click Popover */}
        <IonButton id="click-trigger">About me</IonButton>
        <IonPopover trigger="click-trigger" triggerAction="click">
          <IonContent className="ion-padding">HI I AM ME!</IonContent>
        </IonPopover>

        {/* Right-Click Popover */}
        <IonButton id="context-menu-trigger">About this website</IonButton>
        <IonPopover trigger="context-menu-trigger" triggerAction="context-menu">
          <IonContent className="ion-padding">THIS WEBSITE IS ABOUT ADVENTURE!</IonContent>
        </IonPopover>

        {/* Hover Popover */}
        <IonButton id="hover-trigger">Terms and Condition</IonButton>
        <IonPopover trigger="hover-trigger" triggerAction="hover">
          <IonContent className="ion-padding">AGREE!</IonContent>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default About;
