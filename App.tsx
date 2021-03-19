/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Pressable, Text} from 'react-native';
import * as Tabs from 'react-native-collapsible-tab-view';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import Albums from './Albums';
import Page from './Page';
import {TabScreenContext} from './context';

declare const global: {HermesInternal: null | {}};

enableScreens();

const GetNewCovers = () =>
  [
    'https://source.unsplash.com/random/1600x900',
    'https://source.unsplash.com/random/1600x901',
    'https://source.unsplash.com/random/1600x902',
    'https://source.unsplash.com/random/1600x903',
    'https://source.unsplash.com/random/1600x904',
    'https://source.unsplash.com/random/1600x905',
    'https://source.unsplash.com/random/1600x906',
    'https://source.unsplash.com/random/1600x907',
    'https://source.unsplash.com/random/1600x908',
    'https://source.unsplash.com/random/1600x909',
    'https://source.unsplash.com/random/1600x910',
  ].sort(() => 0.5 - Math.random());

const COVERS = GetNewCovers();

const Header = () => {
  const animated = useSharedValue(0);
  useEffect(() => {
    animated.value = withDelay(1, withTiming(1));
  }, []);
  const headerStylez = useAnimatedStyle(() => {
    return {
      height: animated.value === 1 ? 100 : 0,
    };
  });
  return <Animated.View style={[styles.header, headerStylez]} />;
};

const TabScreen = React.memo(() => {
  const [covers, _] = React.useState(COVERS);
  const pageRef = React.useRef<Tabs.CollapsibleRef>(null);

  const _renderTabBar = (props: any) => (
    <Tabs.MaterialTabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 2,
      }}
    />
  );

  const [tabs, setTabs] = React.useState<any>([
    {
      component: <Albums />,
      name: 'B',
    },
  ]);

  const firstRender = React.useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setTabs([
      {
        component: <Albums />,
        name: 'B',
      },
      {
        component: <Page />,
        name: 'A',
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenContext.Provider
        value={{
          covers,
        }}>
        <Tabs.Container
          HeaderComponent={Header}
          // HeaderComponent={() => <View style={{height: 100}} />}
          TabBarComponent={_renderTabBar}
          ref={pageRef}
          pagerProps={{
            showsVerticalScrollIndicator: false,
          }}
          lazy
          snapThreshold={0.5}>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.name} name={tab.name}>
              {tab.component}
            </Tabs.Tab>
          ))}
        </Tabs.Container>
      </TabScreenContext.Provider>
    </SafeAreaView>
  );
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={() => navigation.navigate('TabScreen')}>
        <Text>Home Screen</Text>
      </Pressable>
    </View>
  );
};

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName="TabScreen">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="TabScreen"
        component={TabScreen}
        options={{title: 'Tabs'}}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    justifyContent: 'center',
    width: '100%',
  },
});

export default App;
