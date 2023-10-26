import { View, Text, Image, Pressable } from "react-native";

const JobItem = ({
  title,
  companyLogo,
  companyName,
  companyLocation,
  postedDate,
}) => {
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-EN", options);
  };

  return (
    <View
      style={{ borderWidth: 1, borderColor: "lightgray", paddingBottom: 15 }}
    >
      <Image
        style={{
          height: 70,
          width: 70,
          position: "absolute",
          zIndex: 1,
          top: 50,
          left: 15,
        }}
        source={{
          uri: `${companyLogo}`,
        }}
      />
      <View>
        <Image
          style={{ height: 100, width: "100%" }}
          source={require("../assets/job-bg.png")}
        />
      </View>
      <View style={{ marginTop: 50, marginLeft: 10, gap: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Text>{companyName}</Text>
        <Text>{companyLocation}</Text>
        <Text style={{ color: "gray" }}>{formatDate(postedDate)}</Text>
      </View>
    </View>
  );
};

export default JobItem;
