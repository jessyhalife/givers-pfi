const peopleService = {
  save: (idToken, people_id) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${people_id}`,
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

  help: (idToken, people_id, body) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${people_id}/help`,
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
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  },

  markSeen: (idToken, id) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/seen/${id}`,
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  },

  markNotSeen: (idToken, id) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/notSeen/${id}`,
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  },

  getById: (people_id, idToken) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${people_id}`,
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

  getHelpByPeopleId: (people_id, idToken) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${people_id}/help`,
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
export default peopleService;
