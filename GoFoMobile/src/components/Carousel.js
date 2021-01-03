import React, { useCallback, memo, useRef, useState } from "react";
import {
    FlatList,
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const Slide = memo(function Slide({ data }) {
    console.log('MERA Slide ==>  ',data)
    return (
        <View
            key = {data}
            style={styles.slide}>
            <Image
                source={{ uri: data }}
                style={styles.slideImage}
                resizeMode = {'contain'}
            />
        </View>
    );
});

function Pagination({slideList, index }) {
    console.log('MERA  slideList ',slideList.length, ' -- ',index)
    return (
        <View style={styles.pagination} pointerEvents="none">
            {slideList.map((item, i) => {
                return (
                    <View
                        key={item}
                        style={[
                            styles.paginationDot,
                            index === i
                                ? styles.paginationDotActive
                                : styles.paginationDotInactive,
                        ]}
                    />
                );
            })}
        </View>
    );
}

export default function Carousel({slideList}) {
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2,
        keyExtractor: useCallback(s => String(s.id), []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: windowWidth,
                offset: index * windowWidth,
            }),
            []
        ),
    };

    const renderItem = useCallback(function renderItem({ item }) {
        return <Slide data={item} />;
    }, []);
//{...flatListOptimizationProps}
    return (
        <View>
            <FlatList
                data={slideList}
                style={styles.carousel}
                renderItem={renderItem}
                pagingEnabled = {true}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}

            />

                <Pagination
                    slideList = { slideList}
                    index = {index}
                />
        </View>
    );
}



const styles = StyleSheet.create({
    slide: {
        height: 400,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    slideImage: { width: windowWidth, height: windowHeight },

    pagination: {
        position: "absolute",
        bottom: 8,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    paginationDotActive: { backgroundColor: "lightblue" },
    paginationDotInactive: { backgroundColor: "gray" },

    carousel: { flex: 1 },
});
