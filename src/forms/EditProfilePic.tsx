import React, { useState } from "react";

interface EditProfilePicProps {
    profile: UserProfile;
}
const EditProfilePic: React.FC<EditProfilePicProps> = ({ profile }) => {
    const [pic, setPic] = useState({});
    const [picUrl, setPicUrl] = useState(null);
    return (
        <form>
            <legend>Profile Picture</legend>

            <div className="profile-pic-container">
                <img
                    src={picUrl ? picUrl.picUrl : profile.pic}
                    alt="Profile Pic"
                    width="100%"
                />
            </div>

            <legend>Change Profile Picture</legend>
            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input
                            type="file"
                            accept="image/*"
                            className="custom-file-input"
                            id="inputGroupFile02"
                            onChange={(e) => {
                                setPic(e.target.files[0]);
                                setPicUrl({
                                    picUrl: URL.createObjectURL(
                                        e.target.files[0]
                                    ),
                                });
                            }}
                        />
                        <label className="custom-file-label">
                            {pic["name"] ? <p>{pic["name"]}</p> : "Choose file"}
                        </label>
                    </div>
                </div>
            </div>
            <div className="btns">
                <button type="submit" className="btn btn-success">
                    Upload
                </button>
            </div>
        </form>
    );
};

export default EditProfilePic;
