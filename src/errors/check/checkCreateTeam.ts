import * as regex from "../../regex";

export default function checkCreateTeam(
    captainName: string,
    captainTag: string,
    captainProfile: string
) {
    let hasError = false;
    let message = "";

    if (captainName === "") {
        message = "Captain name is required";
        hasError = true;
    }

    if (!regex.DISCORD_TAG.test(captainTag)) {
        message = "Invalid Discord tag";
        hasError = true;
    }

    if (!regex.STEAM_PROFILE.test(captainProfile)) {
        message = "Invalid Steam profile url";
        hasError = true;
    }
    return { hasError, message };
}
