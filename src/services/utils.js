/* GET */
export function getNeeds() {
  fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes")
    .then(response => response.json())
    .then(json => {
      return json;
    });
}
/* GET */
export function getAges() {
  fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
    .then(response => response.json())
    .then(json => {
      return json;
    });
}
