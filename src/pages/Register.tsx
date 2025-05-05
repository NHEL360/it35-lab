import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonModal,
  IonText,
  IonTitle,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // ✅ Import history
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert isOpen={isOpen} onDidDismiss={onClose} header="Notification" message={message} buttons={['OK']} />
);

const Register: React.FC = () => {
  const history = useHistory(); // ✅ Create history object
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }
    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error("Account creation failed: " + error.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from("users").insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);

      if (insertError) throw new Error("Failed to save user data: " + insertError.message);
      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : "An unknown error occurred.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center mt-10">
          <img src="https://cdn-icons-gif.flaticon.com/18986/18986439.gif" alt="Register" className="w-36 h-36 rounded-full" />
          <h1 className="text-center text-xl font-bold mt-4 mb-6">CREATE ACCOUNT</h1>

          <div className="w-full max-w-md p-6 border-4 rounded-xl shadow-lg bg-white"
            style={{ borderImage: 'linear-gradient(to right, red, blue) 1' }}>
            <IonInput label="Username" labelPlacement="stacked" fill="outline" value={username} onIonChange={e => setUsername(e.detail.value!)} placeholder="Enter username" className="mb-4" />
            <IonInput label="First Name" labelPlacement="stacked" fill="outline" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} placeholder="Enter first name" className="mb-4" />
            <IonInput label="Last Name" labelPlacement="stacked" fill="outline" value={lastName} onIonChange={e => setLastName(e.detail.value!)} placeholder="Enter last name" className="mb-4" />
            <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} placeholder="Enter email" className="mb-4" />
            <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} placeholder="Password" className="mb-4">
              <IonInputPasswordToggle slot="end" />
            </IonInput>
            <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} placeholder="Confirm password" className="mb-4">
              <IonInputPasswordToggle slot="end" />
            </IonInput>
            <IonButton onClick={handleOpenVerificationModal} expand="full" shape="round" className="mt-4">Register</IonButton>
            <IonButton routerLink="/it35-lab" expand="full" fill="clear" shape="round">Already have an account? Sign in</IonButton>
          </div>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg bg-white shadow">
              <IonTitle className="text-center text-xl mb-4">Confirm Registration</IonTitle>
              <IonText>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Name:</strong> {firstName} {lastName}</p>
              </IonText>
              <div className="flex justify-end mt-4">
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton onClick={doRegister}>Confirm</IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Success Modal with Navigation Fix */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding flex flex-col items-center justify-center text-center h-full">
            <IonTitle className="mt-10">🎉 Registration Successful</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email for confirmation.</p>
            </IonText>
            <IonButton
              className="mt-4"
              color="primary"
              onClick={() => {
                setShowSuccessModal(false);
                setTimeout(() => history.push("/it35-lab"), 300); // 👈 programmatic navigation
              }}
            >
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Alert Box */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
