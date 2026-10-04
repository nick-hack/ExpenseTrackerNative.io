import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const myImage = require("../../../assets/myimage3.png");

/* ================= DATA ================= */
const DATA = [
  {
    id: "1",
    title: "Developer",
    desc: "Aniket Kavathekar - Full Stack Software Developer.",
    icon: "person",
  },
  {
    id: "2",
    title: "Purpose",
    desc: "Track expenses, income & financial insights smoothly.",
    icon: "insights",
  },
  {
    id: "3",
    title: "Tech Stack",
    desc: "React Native, .Net Core,ReactJs,MySQL, JWT, REST APIs, MongoDB.",
    icon: "code",
  },
];

const CARD_WIDTH = width * 0.75;

/* ================= FLOATING BACKGROUND PARTICLES ================= */
const PARTICLES = new Array(15).fill(0).map((_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 6 + 2,
}));

const AboutApp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  let index = 0;

  /* AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % DATA.length;

      flatListRef.current?.scrollToOffset({
        offset: index * CARD_WIDTH,
        animated: true,
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* BACKGROUND ANIMATION */
  const floatAnim = useRef(
    PARTICLES.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    floatAnim.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000 + i * 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000 + i * 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1.1, 0.85],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <MaterialIcons name={item.icon} size={38} color="#4A90E2" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        {/* ================= LIVE BACKGROUND ================= */}
        <View style={StyleSheet.absoluteFillObject}>
          {PARTICLES.map((p, i) => {
            const translateY = floatAnim[i].interpolate({
              inputRange: [0, 1],
              outputRange: [0, -60],
            });

            const opacity = floatAnim[i].interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 0.6],
            });

            return (
              <Animated.View
                key={p.id}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  borderRadius: 50,
                  backgroundColor: "#4A90E2",
                  opacity,
                  transform: [{ translateY }],
                }}
              />
            );
          })}
        </View>

        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <Image source={myImage} style={styles.image} />
          <Text style={styles.name}>Aniket Kavathekar</Text>
          <Text style={styles.role}>Full Stack Developer</Text>
        </View>

        {/* ================= CARDS (UNCHANGED) ================= */}
        <Animated.FlatList
          ref={flatListRef}
          data={DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: (width - CARD_WIDTH) / 2,
          }}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />

        {/* ================= ABOUT APP SECTION ================= */}
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>About Application</Text>

          <Text style={styles.aboutText}>
            This is a modern Expense Tracker application designed and developed
            by <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Aniket Kavathekar</Text>.
          </Text>

          <Text style={styles.aboutText}>
            It helps users track income, expenses, and financial insights in a
            clean and simple UI using React Native.
          </Text>

          <View style={styles.featureRow}>
            <Text style={styles.feature}>✔ Fast Performance</Text>
            <Text style={styles.feature}>✔ Secure Login (JWT)</Text>
            <Text style={styles.feature}>✔ Real-time Data</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AboutApp;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  role: {
    fontSize: 14,
    color: "#B0C4DE",
  },

  card: {
    width: CARD_WIDTH,
    height: 220,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  desc: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    color: "#DCE6F1",
    lineHeight: 20,
  },

  /* ================= ABOUT SECTION ================= */
  aboutBox: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  aboutText: {
    fontSize: 13,
    color: "#DCE6F1",
    marginBottom: 8,
    lineHeight: 20,
  },

  featureRow: {
    marginTop: 10,
  },

  feature: {
    fontSize: 13,
    color: "#4A90E2",
    marginVertical: 2,
    fontWeight: "600",
  },
});