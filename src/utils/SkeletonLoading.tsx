import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';

const SkeletonLoading = () => {
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
    <View className="justify-between py-3 flex-row">
      {/* User icon placeholder */}
      <View style={{marginRight: 10}}>
        <Animated.View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#cccccc',
            marginBottom: 10,
            opacity: opacityValue,
          }}
        />
      </View>

      {/* Text placeholders */}
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            width: '70%',
            height: 20,
            backgroundColor: '#cccccc',
            marginBottom: 10,
            opacity: opacityValue,
          }}
        />
        <Animated.View
          style={{
            width: '90%',
            height: 15,
            backgroundColor: '#cccccc',
            opacity: opacityValue,
          }}
        />
      </View>
    </View>
  );
};

export default SkeletonLoading;
