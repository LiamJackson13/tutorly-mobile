import {router} from "expo-router";
import React, {useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuthStore} from "@/src/features/auth/store/AuthStore";
import {supabase} from "@/src/utils/supabase";
import {GuestOnlyGuard} from "@/src/features/auth/components/GuestOnly";

const HomeScreen = () => {
	const user = useAuthStore((state) => state.user);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	async function debugSession() {
		const {data} = await supabase.auth.getSession()

		console.log('SESSION:', data.session)
		console.log('ACCESS TOKEN:', data.session?.access_token)
	}

	useEffect(() => {
		console.log("=== AUTH STORE ===");
		console.log("User:", user);
		console.log("Is Authenticated:", isAuthenticated);
		console.log("==================");

	}, [user, isAuthenticated]);

	const callTestAuthEndpoint = async () => {
		const {data} = await supabase.auth.getSession();
		const accessToken = data.session?.access_token;

		if (!accessToken) {
			console.log('No access token');
			return;
		}

		const response = await fetch('http://localhost:3000/test-auth', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const json = await response.json();
		console.log('Backend response:', json);
	};


	return (
		<GuestOnlyGuard>
			<View style={styles.container}>
				<Text>HomeScreen</Text>
				<TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
					<Text style={{color: "blue", fontSize: 16}}>Go to Sign In</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={debugSession}><Text style={{color: "blue", fontSize: 16}}>Debug
					Session</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={callTestAuthEndpoint}>
					<Text style={{color: "blue", fontSize: 16}}>Test Endpoint</Text>
				</TouchableOpacity>
			</View>
		</GuestOnlyGuard>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});