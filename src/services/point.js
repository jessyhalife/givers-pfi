export function create(point) {
  fetch(`https://us-central1-givers-229af.cloudfunctions.net/webApi/point`)
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

export function getById(id) {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/point/${key}`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}
/* POST*/
export function going() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/point/${key}/going`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* POST*/
export function trust() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/point/${key}/trust`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

/* POST*/
export function notTrust() {
  fetch(
    `https://us-central1-givers-229af.cloudfunctions.net/webApi/point/${key}/untrust`
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
