import React from 'react';
import {Text, View} from "react-native";


const Profile = (role: "parent" | "student" | "tutor", email: string, name: string, phone?: string) => {
    return (
        <View>
            <Text>Profile</Text>
            {/*Profile photo*/}

            {/*Name*/}
            <Text>{name}</Text>
            {/*Role*/}
            <Text>{role}</Text>
            {/*Email*/}
            <Text>{email}</Text>
            {/*Phone*/}
            <Text>{phone}</Text>
            {/*Edit profile button*/}

            {/*Logout button*/}

        </View>
    )
}

export default Profile;