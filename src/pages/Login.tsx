import { 
  IonAlert,
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
      <IonContent className='ion-padding'>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
          {/* Gradient border wrapper */}
          <div className="p-[2px] rounded-xl bg-gradient-to-r from-red-500 to-blue-500 shadow-xl w-full max-w-md">
            {/* Inner white card */}
            <div className="bg-white rounded-xl p-6 space-y-6">
              <div className="flex flex-col items-center">
                <img 
                  src="https://cdn-icons-gif.flaticon.com/18986/18986439.gif" 
                  alt="Login GIF" 
                  className="w-32 h-32 rounded-full shadow-md mb-2"
                />
                <h1 className="text-2xl font-bold text-gray-700">USER LOGIN</h1>
              </div>

              <IonInput
                label="Email" 
                labelPlacement="floating" 
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                className="w-full"
              />
              <IonInput
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                className="w-full"
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton onClick={doLogin} expand="full" shape="round" className="mt-2">
                Login
              </IonButton>

              <IonButton 
                routerLink="/it35-lab/register" 
                expand="full" 
                fill="clear" 
                shape="round" 
                className="text-sm text-blue-500 hover:underline"
              >
                Don't have an account? Register here
              </IonButton>
            </div>
          </div>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

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
