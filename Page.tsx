import React, {useContext} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import * as Tabs from 'react-native-collapsible-tab-view';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const ListEmptyComponent = () => {
  const {headerHeight, scrollY, scrollYCurrent} = Tabs.useTabsContext();

  const translateY = useDerivedValue(() => {
    return Animated.interpolate(
      scrollYCurrent.value,
      [0, headerHeight],
      [-headerHeight / 2, 0],
    );
  }, [scrollY]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.listEmpty, stylez]}>
      <Text>Centered Empty List!</Text>
    </Animated.View>
  );
};

export const Page: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Tabs.FlatList
      data={[0]}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({item, index}) => <View style={styles.page} />}
      keyExtractor={(_, i) => String(i)}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      style={styles.container}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  page: {
    flex: 1,
  },
});
