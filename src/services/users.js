import firebaseApp from "../config/config";
const userService = {
  create: (idToken, body) => {
    return fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/users`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    );
  },
  getUser: idToken => {
    return fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/users`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    );
  },

  saveSettings: async (idToken, body) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/users/notifications`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(response => response.json())
      .catch(error => {
        throw error;
      });
  },

  updateFCM: (idToken, fcmToken) => {
    var uid = firebaseApp.auth().currentUser.uid;
    console.log(uid);
    return firebaseApp
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ fcm_token: fcmToken.fcm_token, user_id: uid }, { merge: true });
  }
};

export default userService;
