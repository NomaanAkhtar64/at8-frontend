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
// !regex.DISCORD_TAG.test(captainTag)
    if (captainTag.match(regex.DISCORD_TAG) === null) {
        message = "Invalid Discord tag";
        hasError = true;
    }
// !regex.STEAM_PROFILE.test(captainProfile)
    if (captainProfile.match(regex.STEAM_PROFILE) === null) {
        message = "Invalid Steam profile url";
        hasError = true;
    }
    return { hasError, message };
}
