export default function checkEditUserProfileData(discordTag: string) {
    let isValid = true;
    let msg = "";

    let tagRegex = /([a-zA-Z0-9!@#$%-_])+[#]\d{4}/gm;
    if (!tagRegex.test(discordTag)) {
        msg = "Discord name or Tag is Invalid";
        isValid = false;
    }

    return { isValid, msg };
}
