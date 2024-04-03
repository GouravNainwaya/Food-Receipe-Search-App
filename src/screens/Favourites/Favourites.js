import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Suspense, lazy, useEffect} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import colors from '../../utlis/colors';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromFavorites} from '../../redux/slices/favoritesSlice';
const RowStoriesCards = lazy(() => import('../../components/RowStoriesCards'));
const BigNewsStoryCard = lazy(() =>
  import('../../components/BigNewsStoryCard'),
);
import Swipelist from 'react-native-swipeable-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replace with the desired icon library
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Replace with the desired icon library
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {handlePress} from '../Home/Home';
import {FlatList} from 'react-native-gesture-handler';
const Favourites = ({navigation}) => {
  const favorites = useSelector(state => state.favorites.list); // Access the favorites list from Redux store state
  //   console.log(
  //     '🚀 ~ file: Favourites.js:9 ~ Favourites ~ favorites:',
  //     );
  favorites?.map(item => {
    console.log('label:', item?.label);
  });
  const dispatch = useDispatch();
  let scrollRef;

  useEffect(() => {
    if (navigation) {
      const navigationHeaderObj = {
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors?.fullColorInverse,
        },
        headerTintColor: colors?.fullColorInverse,
      };
      navigation.setOptions(navigationHeaderObj);
    }
  }, [navigation]);

  return (
    <ScreenWrapper>
      {!favorites?.length ? (
        <View
          style={{
            marginTop: 150,
            alignItems: 'center',
            marginHorizontal: 30,
            flex: 1,
          }}>
          <FontAwesome5
            name="save"
            size={90}
            style={{
              marginLeft: -2,
              marginRight: 10,
              alignSelf: 'center',
              color: colors.fullColorInverse,
            }}
          />
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'bold',
              fontSize: 24,
              color: colors.fullColorInverse,
            }}>
            No Favourites Found!
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'normal',
              fontSize: 18,
              color: colors.fullColorInverse,
            }}>
            Tap on the favorite
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontWeight: 'normal',
              fontSize: 18,
              color: colors.fullColorInverse,
              textAlign: 'center',
            }}>
            recipe screen to mark as Favourite
          </Text>

          {/* for Button  */}
          <Pressable
            style={{
              position: 'absolute',
              bottom: 25,
              width: '90%',
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              padding: 10,
              flex: 1,
            }}
            onPress={() => {
              navigation?.navigate('Home');
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '400',
                textAlign: 'center',
              }}>
              {'Explore Receipe'}
            </Text>
          </Pressable>
          {/* for Button  */}
        </View>
      ) : (
        <View
          ref={ref => {
            scrollRef = ref;
          }}
          style={{alignItems: 'center', marginBottom: 40, flexGrow: 1}}>
          <FlatList
            data={[...favorites]?.reverse()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <View style={{minWidth: '100%'}}>
                    <Suspense fallback={<Text>Loading...</Text>}>
                      <BigNewsStoryCard
                        item={item}
                        onPress={() => handlePress(item, navigation)}
                        colors={colors}
                      />
                    </Suspense>
                  </View>
                );
              } else {
                return (
                  <View style={{minWidth: '100%'}}>
                    <Suspense fallback={<Text>Loading...</Text>}>
                      <RowStoriesCards
                        item={item}
                        onPress={() => handlePress(item, navigation)}
                        colors={colors}
                      />
                    </Suspense>
                  </View>
                );
              }
            }}
            keyExtractor={(item, index) => `post_${index}`}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.gray}}>No favorites found</Text>
              </View>
            )}
            contentContainerStyle={{alignItems: 'center', marginBottom: 40}}
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  header1: {
    backgroundColor: 'white',

    padding: responsiveHeight(1.7),

    alignItems: 'center',

    flexDirection: 'row',

    // justifyContent:"center",
  },

  button: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    // marginLeft:responsiveWidth(10)
  },
  article: {
    marginTop: 20,
    fontSize: 16,
    padding: 10,
  },
});
