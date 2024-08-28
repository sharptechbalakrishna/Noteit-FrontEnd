import React, { useState, useRef, useEffect } from 'react';
import { View, Image, useWindowDimensions, FlatList, Dimensions } from 'react-native';

const Carousel = () => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    

    const carouselData = [
        { id: "01", image: require('../assets/images/homescreen/game-1.jpeg') },
        { id: "02", image: require('../assets/images/homescreen/game-2.jpeg') },
        { id: "03", image: require('../assets/images/homescreen/game-3.png') },
    ];

    const renderItem = ({ item }) => (
        <View>
            <Image
                source={item.image}
                style={{
                    height: windowHeight * 0.20,
                    width: windowWidth,
                    padding: 20,
                    borderRadius:10,
                }}
            />
        </View>
    );

    const renderDotIndicator = () => {
        return carouselData.map((_, index) => (
            <View
                key={index}
                style={{
                    backgroundColor: index === currentIndex ? 'red' : 'gray',
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                }}
            />
        ));
    };

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % carouselData.length;
                flatListRef.current.scrollToIndex({ index: nextIndex });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={carouselData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                snapToInterval={windowWidth}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                {renderDotIndicator()}
            </View>
        </View>
    );
};

export default Carousel;
