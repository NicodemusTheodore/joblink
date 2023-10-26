import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./screens/HomePage";
import JobBoardPage from "./screens/JobBoardPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobDetail from "./screens/JobDetail";
import { ApolloProvider } from "@apollo/client";
import client from "./config";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackJob = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Job List" component={JobBoardPage} />
      <Stack.Screen name="Job Detail" component={JobDetail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Job Board") {
                iconName = focused ? "briefcase" : "briefcase-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#362FD9",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {/* <Tab.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          /> */}
          <Tab.Screen
            name="Job Board"
            component={StackJob}
            options={({ route }) => ({
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                if (routeName === "Job Detail") {
                  return { display: "none" };
                }
                return;
              })(route),
              headerShown: false,
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
