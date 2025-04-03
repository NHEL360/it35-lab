import React, { useState } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonLabel, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonText, 
  useIonRouter,
  IonRow,
  IonGrid,
  IonCol,
  IonToast,
  IonAlert
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};
const Login: React.FC = () => {
  const navigation = useIonRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  const goToSignup = () => {
    // Navigate to the register/signup page
    navigation.push('/register', 'forward', 'replace');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" offsetMd="3">
              <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#4285F4' }}>My App</h1>
              
              <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput 
                  type="email" 
                  value={email} 
                  onIonChange={(e) => setEmail(e.detail.value!)} 
                  required 
                  style={{ borderRadius: '5px', padding: '10px' }}
                />
              </IonItem>
              <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput 
                  type="password" 
                  value={password} 
                  onIonChange={(e) => setPassword(e.detail.value!)} 
                  required 
                  style={{ borderRadius: '5px', padding: '10px' }}
                />
              </IonItem>

              <IonButton onClick={doLogin} expand="full" style={{
                backgroundColor: '#4285F4', 
                color: 'white', 
                padding: '15px', 
                fontSize: '16px', 
                marginTop: '20px',
                borderRadius: '5px',
              }}>
                Login
              </IonButton>

              {/* Sign up link */}
              <IonText color="medium" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                <p>Don't have an account? <span style={{ color: '#4285F4', cursor: 'pointer' }} onClick={goToSignup}>Sign up</span></p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
          <IonToast
           isOpen={showToast}
           onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
/>
      </IonContent>
    </IonPage>
  );
};

export default Login;
