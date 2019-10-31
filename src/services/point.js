const pointService = {
  getTypes: idToken => {
    return fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/points/types",
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
  getContacts: idToken => {
    return fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/points/contacts",
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
  create: (idToken, body) => {
    return fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/points/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken
        }
      }
    );
  }
};
export default pointService;
