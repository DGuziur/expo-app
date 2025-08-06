import { Button } from "@react-navigation/elements";
import { ScrollView, Text, View } from "react-native";

interface Unit {
  id: string;
  title: string;
  desc: string;
}

interface Lesson {
  types: { compare: boolean; fillIn: boolean; listen: boolean; speak: boolean };
}

export default function Index() {
  const units: Unit[] = [
    {
      id: "a",
      title: "lessonOne",
      desc: "orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium pellentesque sapien. Suspendisse consectetur quis.",
    },
    {
      id: "b",
      title: "lessonTwo",
      desc: "Maecenas et finibus ex. Donec accumsan magna at dui consequat gravida. Aenean mollis vehicula libero.",
    },
    {
      id: "c",
      title: "lessonThree",
      desc: "orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium pellentesque sapien. Suspendisse consectetur quis.",
    },
    {
      id: "d",
      title: "lessonFour",
      desc: "orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium pellentesque sapien. Suspendisse consectetur quis.",
    },
  ];

  const lesson: Lesson = {
    types: { compare: true, fillIn: true, listen: true, speak: true },
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text
        style={{
          backgroundColor: "pink",
          fontSize: 50,
          padding: 10,
          textAlign: "center",
          color: "white",
        }}
      >
        Hej szmexy
      </Text>
      <View>
        <ScrollView>
          {units.map((a) => {
            return (
              <View
                key={a.id}
                style={{
                  flex: 1,
                  height: 200,
                  backgroundColor: "powderblue",
                  marginBottom: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 50,
                    color: "white",
                    marginBottom: 1.5,
                  }}
                >
                  {a.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fffff7",
                    margin: "auto",
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  {a.desc}
                </Text>
                <Button style={{ margin: 10 }}>Learn more</Button>
              </View>
            );
          })}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
}
