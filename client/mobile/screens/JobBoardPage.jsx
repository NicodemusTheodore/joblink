import { View, StyleSheet, FlatList, Pressable } from "react-native";
import JobItem from "../components/JobItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_JOBS, GET_JOB_BY_ID } from "../queries";

const JobBoardPage = ({ navigation }) => {
  const clickMe = (id) => {
    navigation.navigate("Job Detail", { id });
  };

  const { loading, error, data } = useQuery(GET_JOBS);

  console.log(data);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.jobs}
        renderItem={({ item }) => (
          <Pressable onPress={() => clickMe(item.id)}>
            <JobItem
              title={item.title}
              companyLogo={item.Company?.companyLogo}
              companyName={item.Company?.name}
              companyLocation={item.Company?.location}
              postedDate={item.createdAt}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
  },
});

export default JobBoardPage;
