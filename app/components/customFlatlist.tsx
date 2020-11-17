import React, { memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StyleProp,
    ViewStyle
} from 'react-native';
const isEqual = require('react-fast-compare');

const styles = StyleSheet.create({
    containerFlatList: { marginTop: 15, marginLeft: 13 }
});

interface VerticalCategoriesProps {
    data: Array<any>;
    renderItem: ({ item, index }) => React.ReactElement;
    containerStyle?: StyleProp<ViewStyle>;
    numColumns?: number;
}
const VerticalCategoriesComponent = ({
    title,
    data,
    renderItem,
    containerStyle,
    numColumns = 1
}: VerticalCategoriesProps) => {
    return (
        <FlatList
            style={containerStyle}
            showsVerticalScrollIndicator={false}
            data={data}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={(item, index) => title + index.toString()}
        />
    );
};

export const VerticalCategories = memo(VerticalCategoriesComponent, isEqual);
