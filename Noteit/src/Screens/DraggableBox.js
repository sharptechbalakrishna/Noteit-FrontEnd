import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const DraggableBox = () => {
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [lastOffset, setLastOffset] = useState({ x: 0, y: 0 });

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setLastOffset({
        x: lastOffset.x + event.nativeEvent.translationX,
        y: lastOffset.y + event.nativeEvent.translationY,
      });
      translateX.setOffset(lastOffset.x);
      translateX.setValue(15);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(15);
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX }, { translateY }],
            },
          ]}
        />
      </PanGestureHandler>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    borderRadius: 8,
  },
});

export default DraggableBox;
