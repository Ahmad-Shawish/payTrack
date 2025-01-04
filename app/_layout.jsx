import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="SingleCard/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="addRecord/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="editRecord/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
