import {StyleSheet, Text, View} from 'react-native';

export default function SplashScreen() {
  <View style={styles.container}>
    <Text style={styles.title}>Splash Screen</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
