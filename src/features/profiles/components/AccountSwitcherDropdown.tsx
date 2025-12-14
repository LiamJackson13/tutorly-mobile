import React, {useEffect, useState} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useAuthStore} from "@/src/features/auth/store/AuthStore";

type LocalUser = {
    id: string;
    email: string;
    role: "student" | "tutor" | "parent";
    name: string;
    phone?: string;
};

const ACCOUNTS: Record<"tutor" | "student" | "parent", LocalUser> = {
    tutor: {id: "t-1", email: "tutor@gmail.com", role: "tutor", name: "Tutor"},
    student: {id: "s-1", email: "student@gmail.com", role: "student", name: "Student"},
    parent: {id: "p-1", email: "parent@gmail.com", role: "parent", name: "Parent"},
};

export default function DevAccountDropdown() {
    const login = useAuthStore((s) => s.login);
    const currentUser = useAuthStore((s) => s.user);
    const [selected, setSelected] = useState<"tutor" | "student" | "parent">("tutor");

    useEffect(() => {
        if (!currentUser) return;
        const key = (Object.keys(ACCOUNTS) as (keyof typeof ACCOUNTS)[]).find(
            (k) => ACCOUNTS[k].email === currentUser.email || ACCOUNTS[k].role === currentUser.role
        );
        if (key) setSelected(key);
    }, [currentUser]);

    function onChange(value: "tutor" | "student" | "parent") {
        setSelected(value);
        login(ACCOUNTS[value]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Dev account</Text>

            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selected}
                    onValueChange={(v) => onChange(v as "tutor" | "student" | "parent")}
                    mode={Platform.select({ios: "dropdown", android: "dropdown"})}
                    style={styles.picker}
                >
                    <Picker.Item label="Tutor — tutor@gmail.com" value="tutor"/>
                    <Picker.Item label="Student — student@gmail.com" value="student"/>
                    <Picker.Item label="Parent — parent@gmail.com" value="parent"/>
                </Picker>
            </View>

            <Text style={styles.current}>
                Current: {currentUser ? `${currentUser.email} (${currentUser.role})` : "No user"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {padding: 12, backgroundColor: "#fff"},
    label: {fontWeight: "600", marginBottom: 6},
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 10,
    },
    picker: {height: 70, width: 250},
    current: {marginTop: 6, color: "#333"},
});