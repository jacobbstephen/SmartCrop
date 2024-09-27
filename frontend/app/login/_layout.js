import { Stack } from "expo-router";
export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="loginPage" options={{headerShown: false}}/>
            <Stack.Screen name="signupPage" options={{headerShown: false}}/>
        </Stack>
    )
}