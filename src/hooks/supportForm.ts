import axios from "axios";
import { __API_URL__ } from "../const";

export default function supportForm(
  email: string,
  first_name: string,
  last_name: string,
  issue: string
) {
  axios
    .post(`${__API_URL__}/api/faq-support/`, {
      email: email,
      first_name: first_name,
      last_name: last_name,
      issue: issue,
    })
    .then((res) => res.data)
    .catch((err) => err);
}
