import axios from "axios";
import { __API_URL__ } from "../const";

export default function supportForm(
    user: number,
    first_name: string,
    last_name: string,
    issue: string
) {
    axios
        .post(`${__API_URL__}/api/faq-support/`, {
            user: user,
            first_name: first_name,
            last_name: last_name,
            issue: issue,
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => console.log(err));
}
