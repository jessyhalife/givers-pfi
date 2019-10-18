import firebaseApp from "../config/config";

export default postHelp = (people_id, body) => {
  firebaseApp
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      fetch(
        `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${this.props.navigation.state.params.people_id}/help`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: idToken
          })
        }
      )
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => data)
        .catch(error => console.log(error));
    });
};
