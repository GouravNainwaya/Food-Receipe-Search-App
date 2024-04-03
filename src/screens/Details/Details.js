import React, {memo, useEffect} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import colors from '../../utlis/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replace with the desired icon library
import {
  addToFavorites,
  removeFromFavorites,
  setFavoritesList,
} from '../../redux/slices/favoritesSlice';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import { storage } from '../../../App';

const RenderHeading = ({text}) => {
  return (
    <Text
      style={{
        color: colors.fullColorInverse,
        fontWeight: '600',
        fontSize: responsiveFontSize(2.5),
        lineHeight: responsiveHeight(5.5),
      }}>
      {text}
    </Text>
  );
};

const cartItemsSelector = state => state.favorites.list;

const isItemInCart = createSelector(
  [cartItemsSelector, (_, itemLabel) => itemLabel],
  (cartItems, itemLabel) => cartItems.some(item => item.label === itemLabel),
);

const Details = ({route, navigation}) => {
  const {item} = route.params;
  // console.log("🚀 ~ file: Details.js:6 ~ Details ~ item:", JSON.stringify(item?.image))
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list); // Access the favorites list from Redux store state
  const isItemInFavorites = favorites?.some(
    favorite => favorite.label === item.label,
  );
  // Alert.alert(itemInCart)
  console.log('itemInCart:', isItemInFavorites);
  console.log('favorites:', favorites);

  useEffect(() => {
    // Load data from MMKV on component mount
    loadData();
  }, []);

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

  const loadData = () => {
    const jsonUser = storage.getString('favouritesListData');
    try {
      const storedData = JSON.parse(jsonUser);
      if (storedData) {
        dispatch(setFavoritesList(storedData));
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      // Handle the error or set default data as needed
    }
  };

  const handleAddToFavorites = () => {
    console.log("🚀 ~ file: Details.js:85 ~ handleAddToFavorites ~ isItemInFavorites:", isItemInFavorites)
    if (isItemInFavorites) {
      dispatch(removeFromFavorites({label: item.label})); // Assuming item.label is the identifier for removal
    }else{
      dispatch(addToFavorites(item));
    }
  }

  return (
    <ScreenWrapper extraStyles={{backgroundColor: colors.background}}>
      <View style={{margin: 10}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: colors.PageDetailedBG,
            elevation: 1,
            borderRadius: responsiveWidth(1.5),
            width: responsiveWidth(91),
          }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.image,
            }}
          />
          <View style={{marginHorizontal: responsiveWidth(2)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>
                {item.label}
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: responsiveHeight(2),
                  alignItems: 'center',
                }}>
                <Pressable onPress={handleAddToFavorites}>
                  {isItemInFavorites ? (
                    <AntDesign
                      name={'star'}
                      size={responsiveFontSize(3.5)}
                      color={colors.gray}
                    />
                  ) : (
                    <AntDesign
                      name={'staro'}
                      size={responsiveFontSize(3.5)}
                      color={colors.gray}
                    />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Favourites');
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: 'grey',
                      textAlign: 'center',
                      marginTop: responsiveHeight(1),
                      textDecorationLine: 'underline',
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    View All
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{marginBottom: responsiveHeight(1)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1.8),
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: responsiveWidth(87),
                  }}>
                  <Text style={styles.dividerText}>Price: </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      textAlignVertical: 'center',
                      color: 'grey',
                    }}>
                    $230
                  </Text>
                </View>
              </View>
              {/* Ingredients */}
              <TouchableOpacity
                disabled
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveHeight(1),
                  justifyContent: 'space-between',
                }}>
                <ScrollView>
                  <RenderHeading text={'Ingredients'} />
                  {item?.ingredientLines?.map(ingredient => (
                    <Text
                      key={ingredient}
                      style={{color: 'grey', marginTop: responsiveHeight(1)}}>
                      {ingredient}
                    </Text>
                  ))}
                </ScrollView>
                {/* <Rating
                    type="custom"
                    ratingCount={5}
                    style={{ paddingVertical: 10 }}
                    startingValue={0}
                    onFinishRating={(e) => console.log(e)}
                  /> */}
              </TouchableOpacity>
              {/* Ingredients */}
              {/* Specialities */}
              <TouchableOpacity
                disabled
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveHeight(1),
                  justifyContent: 'space-between',
                }}>
                <ScrollView>
                  <RenderHeading text={'Specialties'} />
                  {item?.specialties?.map(specialty => (
                    <Text
                      key={specialty}
                      style={{color: 'grey', marginTop: responsiveHeight(1)}}>
                      {specialty}
                    </Text>
                  ))}
                </ScrollView>
              </TouchableOpacity>
              {/* Specialities */}
              {/* Choose Veg & Non Veg */}
              <TouchableOpacity
                disabled
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveHeight(1),
                  justifyContent: 'space-between',
                }}>
                <ScrollView>
                  <RenderHeading text={'Check Veg & Non Veg'} />
                  <Text style={{color: 'grey', marginTop: responsiveHeight(1)}}>
                    Vegetarian: Loading...
                  </Text>
                </ScrollView>
              </TouchableOpacity>
              {/* Specialities */}
              {/* Ratings */}
              {/* Ratings */}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default memo(Details);

const styles = StyleSheet.create({
  title: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2.3),
    maxWidth: responsiveWidth(77),
    color: colors.fullColorInverse,
  },
  dividerText: {
    color: '#74747B',
    fontSize: responsiveFontSize(2.1),
  },
  tinyLogo: {
    height: responsiveHeight(30),
    width: responsiveWidth(91),
  },
  tinyLogo2: {
    height: responsiveWidth(19),
    width: responsiveWidth(12),
    marginTop: responsiveHeight(0.7),
  },
});
