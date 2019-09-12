export function create(person) {
  fetch(`https://us-central1-givers-229af.cloudfunctions.net/webApi/people`)
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

export function getById(id) {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* POST*/
export function seen() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}/seen`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* POST*/
export function notSeen() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}/notseen`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* POST*/
export function help() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}/help`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* GET */
export function getByUserId(userId) {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}/byuser`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}
