import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */


interface ProfileDataProps {
    graphData: {
        givenName: String
        surname: String
        userPrincipalName: String
        id: String
    }
}

export const ProfileData = (props:ProfileDataProps) => {
    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    );
};