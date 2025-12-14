import {Tabs} from "expo-router";
import {UserOnlyGuard} from "@/src/features/auth/components/UserOnly";

const TutorsLayout = () => {
    return <UserOnlyGuard><Tabs>
        <Tabs.Screen name={"index"}/>
        <Tabs.Screen name={"profile"} options={{
            title: "Tutor Profile"
        }}/>
    </Tabs></UserOnlyGuard>;
}

export default TutorsLayout;