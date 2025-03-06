import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle, 
  IonCardTitle,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/react';
import { heartOutline } from 'ionicons/icons';

const favoriteItems = [
  { id: 1, title: "Pizza", subtitle: "Delicious Italian pizza", description: "A cheesy delight with fresh toppings.", color: "warning" },
  { id: 2, title: "Mountain Hiking", subtitle: "Adventure in the wild", description: "Breathtaking views from the top.", color: "success" },
  { id: 3, title: "Beach Vacation", subtitle: "Relaxing waves and sun", description: "Perfect getaway to unwind.", color: "primary" }
];

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList>
          {favoriteItems.map(item => (
            <IonCard key={item.id} color={item.color}>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={heartOutline} style={{ marginRight: '8px', color: 'red' }} />
                  {item.title}
                </IonCardTitle>
                <IonCardSubtitle>{item.subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{item.description}</IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
