// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyBCKS2SpibTAzFUm_1tqB-8-OuH5cse-8k",
  authDomain: "fbcasf-4a75e.firebaseapp.com",
  databaseURL: "https://fbcasf-4a75e-default-rtdb.firebaseio.com",
  projectId: "fbcasf-4a75e",
  storageBucket: "fbcasf-4a75e.firebasestorage.app",
  messagingSenderId: "917743303180",
  appId: "1:917743303180:web:5a455e3889098e57af0c29",
  measurementId: "G-TT505C1Y1D"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addData(data: any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = await doc(db, 'pays', data.id!);
    await setDoc(docRef, data);

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, status: 'pending' },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
export { db };
