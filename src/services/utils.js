const utilesService = {
  getAges: idToken => {
    fetch(`https://us-central1-givers-229af.cloudfunctions.net/webApi/ages`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: idToken
      })
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  },

  getNeeds: idToken => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
};

export default utilesService;
