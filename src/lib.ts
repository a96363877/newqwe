
import {
  ref,
  onDisconnect,
  set,
  onValue,
  serverTimestamp as rtdbServerTimestamp,
} from "firebase/database";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { database, db } from "./firebase";
import { addData } from "./firebase"



export const getLocation = async () => {
  const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
  const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const country = await response.text()
    const _id = localStorage.getItem('visitor')

    addData({
      createdDate: new Date().toISOString(),
      id: _id,
      country: country,
    })

    localStorage.setItem("country", country)
  } catch (error) {
    console.error("Error fetching location:", error)
  }
}


export const setupOnlineStatus = (userId: string) => {
  if (!userId) return;

  // Create a reference to this user's specific status node in Realtime Database
  const userStatusRef = ref(database, `/status/${userId}`);

  // Create a reference to the user's document in Firestore
  const userDocRef = doc(db, "pays", userId);

  // Set up the Realtime Database onDisconnect hook
  onDisconnect(userStatusRef)
    .set({
      state: "offline",
      lastChanged: rtdbServerTimestamp(),
    })
    .then(() => {
      // Update the Realtime Database when this client connects
      set(userStatusRef, {
        state: "online",
        lastChanged: rtdbServerTimestamp(),
      });

      // Update the Firestore document
      updateDoc(userDocRef, {
        online: true,
        lastSeen: serverTimestamp(),
      }).catch((error) =>
        console.error("Error updating Firestore document:", error)
      );
    })
    .catch((error) => console.error("Error setting onDisconnect:", error));

  // Listen for changes to the user's online status
  onValue(userStatusRef, (snapshot) => {
    const status = snapshot.val();
    if (status?.state === "offline") {
      // Update the Firestore document when user goes offline
      updateDoc(userDocRef, {
        online: false,
        lastSeen: serverTimestamp(),
      }).catch((error) =>
        console.error("Error updating Firestore document:", error)
      );
    }
  });
};

export const setUserOffline = async (userId: string) => {
  if (!userId) return;

  try {
    // Update the Firestore document
    await updateDoc(doc(db, "pays", userId), {
      online: false,
      lastSeen: serverTimestamp(),
    });

    // Update the Realtime Database
    await set(ref(database, `/status/${userId}`), {
      state: "offline",
      lastChanged: rtdbServerTimestamp(),
    });
  } catch (error) {
    console.error("Error setting user offline:", error);
  }
};
