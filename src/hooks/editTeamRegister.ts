import axios from "axios";
import { __API_URL__ } from "../const";

export default function editTeamRegister(values: Partial<Teams>) {
    axios
        .put(`${__API_URL__}/api/teams/${values.id}/`, values)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
}
