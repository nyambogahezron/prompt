import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from "react-native";

type LoaderProps = { isLoading: boolean };  
const Loader = ({ isLoading }:LoaderProps) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      style={[styles.container, { height: screenHeight }]}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 10,
  },
});

export default Loader;
