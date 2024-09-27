import { Stack } from "expo-router";
export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="cropHelp" options={{headerShown: false}}/>
            <Stack.Screen name="user" options={{headerShown: false}}/>
        </Stack>
    )
}