import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
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

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#f8f9fa'
        }}
      >
        <div
          style={{
            maxWidth: '400px',
            margin: 'auto',
            background: '#ffffff',
            padding: '40px 20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IonAvatar
            style={{
              marginBottom: '20px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#f1f3f4',
            }}
          >
            <img
              src="https://imgs.search.brave.com/NALf81myMtUfEqikqKeNKT2ecFtKJBj1T24fObQ5B1g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/YVJucWkxVWFVMjBB/QUFBTS9jaGluYS1n/aWYtY2hpbmVzZS1n/aWYuZ2lm.jpeg"
              alt="Custom Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </IonAvatar>

          <h1 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 500, color: '#202124' }}>
            Sign in
          </h1>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{ width: '100%' }}
          />

          <IonInput
            style={{ marginTop: '15px', width: '100%' }}
            fill="outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            onClick={doLogin}
            expand="block"
            shape="round"
            style={{
              marginTop: '30px',
              backgroundColor: '#1a73e8',
              color: '#fff',
              fontWeight: 500,
            }}
          >
            Sign In
          </IonButton>

          <IonButton
            routerLink="/it35-lab/register"
            expand="block"
            fill="clear"
            shape="round"
            style={{
              color: '#1a73e8',
              fontWeight: 500,
              marginTop: '10px',
              textTransform: 'none',
            }}
          >
            Don’t have an account? Register here
          </IonButton>
        </div>

        {/* Alert for login errors */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* Toast for success message */}
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
