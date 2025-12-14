import {Tabs} from "expo-router";

const ParentsLayout = () => {
    return <Tabs>
        <Tabs.Screen name={"index"}/>
        <Tabs.Screen name={"profile"}/>
    </Tabs>;
}

export default ParentsLayout;