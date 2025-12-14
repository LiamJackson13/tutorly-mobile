import {Tabs} from "expo-router";
import {UserOnlyGuard} from "@/src/features/auth/components/UserOnly";

const StudentsLayout = () => {
    return <UserOnlyGuard><Tabs>
        <Tabs.Screen name={"index"}/>
        <Tabs.Screen name={"profile"} options={{
            title: "Students Profile"
        }}/>
    </Tabs></UserOnlyGuard>;
}

export default StudentsLayout;