import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';

const Skeleton: React.FC = () => {
  // Define animated value for opacity
  const opacityValue = useRef(new Animated.Value(0)).current;

  // Define pulse animation
  const pulseAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.3,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]),
  );

  // Start pulse animation when component mounts
  useEffect(() => {
    pulseAnimation.start();
  }, []);

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map(index => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonItem,
            {
              backgroundColor: opacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  'rgba(128, 128, 128, 0.3)',
                  'rgba(128, 128, 128, 1)',
                ],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  skeletonItem: {
    width: 250,
    height: 160,
    borderRadius: 20,
    backgroundColor: 'gray',
    marginRight: 10,
  },
});

export default Skeleton;
