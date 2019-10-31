const pointService = {
  getTypes: idToken => {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/events/types",
      {
        method: "GET",
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

  create: (idToken, body) => {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/events/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken
        }
      }
    )
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  }
};
export default pointService;
