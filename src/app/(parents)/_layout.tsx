import {Tabs} from "expo-router";
import {UserOnlyGuard} from "@/src/features/auth/components/UserOnly";

const ParentsLayout = () => {
    return (
        <UserOnlyGuard>
            <Tabs>
                <Tabs.Screen name={"index"}/>
                <Tabs.Screen name={"profile"}/>
            </Tabs>
        </UserOnlyGuard>
    );
}

export default ParentsLayout;