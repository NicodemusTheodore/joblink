import { View, Text, Image, ScrollView, Pressable, Button } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_JOB_BY_ID, GET_USER_BY_ID } from "../queries";

const JobDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const { data } = useQuery(GET_JOB_BY_ID, {
    variables: { jobId: +id },
  });

  console.log(id);

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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View>
            <Image
              style={{
                height: 120,
                width: "100%",
              }}
              source={require("../assets/job-bg.png")}
            />
            <View style={{ padding: 10, gap: 5 }}>
              <Image
                style={{ height: 80, width: 80 }}
                source={{ uri: `${data?.job.Company.companyLogo}` }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {data?.job.title}
              </Text>
              <Text>{data?.job.Company.name}</Text>
              <Text>{data?.job.Company.location}</Text>
              <Text>{data?.job.jobType}</Text>
              <View>
                <Text style={{ color: "gray" }}>
                  Posted on {formatDate(data?.job.createdAt)}
                </Text>
                <Text style={{ color: "gray" }}>
                  By {data?.job.Author.username}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 20,
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{ marginBottom: 5, fontWeight: "bold", fontSize: 15 }}
              >
                Job Description
              </Text>
              <Text>{data?.job.description}</Text>
            </View>

            <View>
              <Text
                style={{ marginBottom: 5, fontWeight: "bold", fontSize: 15 }}
              >
                Qualifications
              </Text>
              {data?.job.Skills.map((skill) => (
                <View key={skill.id}>
                  <Text>
                    • {skill.name} • {skill.level}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          >
            <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 15 }}>
              About
            </Text>
            <Text>{data?.job.Company.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 1 }}>
        <View
          style={{
            backgroundColor: "#1363DF",
            borderRadius: 4,
          }}
        >
          <Button title="Apply" color="#1363DF" />
        </View>
      </View>
    </View>
  );
};

export default JobDetail;
