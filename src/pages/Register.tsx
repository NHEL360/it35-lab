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
  IonGrid, 
  IonRow, 
  IonCol,
  useIonRouter,
} from '@ionic/react';

const Register: React.FC = () => {
  const navigation = useIonRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const doRegister = () => {
    if (password === confirmPassword) {
      console.log("Registering user with email:", email);
      navigation.push('/login', 'forward', 'replace'); // Navigate to login after registration
    } else {
      console.log("Passwords do not match");
      alert("Passwords do not match. Please try again.");
    }
  };

  const goBackToLogin = () => {
    navigation.push('/login', 'forward', 'replace');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" offsetMd="3">
              <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#4285F4' }}>My App</h1>

              {/* Full Name Input */}
              <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Full Name</IonLabel>
                <IonInput 
                  value={name} 
                  onIonChange={(e) => setName(e.detail.value!)} 
                  required 
                  style={{ borderRadius: '5px', padding: '10px' }}
                />
              </IonItem>

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Confirm Password Input */}
              <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Confirm Password</IonLabel>
                <IonInput 
                  type="password" 
                  value={confirmPassword} 
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)} 
                  required 
                  style={{ borderRadius: '5px', padding: '10px' }}
                />
              </IonItem>

              {/* Register Button */}
              <IonButton onClick={doRegister} expand="full" style={{
                backgroundColor: '#4285F4', 
                color: 'white', 
                padding: '15px', 
                fontSize: '16px', 
                marginTop: '20px',
                borderRadius: '5px',
              }}>
                Register
              </IonButton>

              {/* Link to go back to Login Page */}
              <IonText color="medium" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                <p>Already have an account? <span style={{ color: '#4285F4', cursor: 'pointer' }} onClick={goBackToLogin}>Login</span></p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
