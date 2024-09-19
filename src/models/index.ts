import axios from "axios";

export function callAPI() {
  axios
    .get("/api/posts")
    .then((response) => {})
    .catch((e) => console.log(e));
}
