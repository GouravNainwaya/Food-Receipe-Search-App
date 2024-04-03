import React, {lazy, memo, Suspense} from 'react';
import {View, Text, Pressable, TouchableOpacity,Image} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'; // Replace with correct imports
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replace with the desired icon library
import {useDispatch, useSelector} from 'react-redux';
import {decode} from 'html-entities';
import { PostsImageNotFound, replaceDomain } from '../utlis/helper';
// import {TouchableOpacity } from 'react-native-gesture-handler';
const RowStoriesCards = ({
  item,
  containerStyles,
  showCategoryName,
  onPress,
  showShareAndTime,
  otherMatchingCategorie,
  onSharePress,
  matchingCategories,
  colors
}) => {
  console.log('item: ', item?.THUMBNAIL);
  return (
    <TouchableOpacity
      onPress={onPress}>
      <View style={
        {
          padding: responsiveWidth(2),
          backgroundColor: colors?.secondary,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          marginTop: responsiveWidth(5),
          marginHorizontal: 10,
        }}>
      <View style={{flexDirection: 'row',}}>
        <View style={{}}>
          <Image
            style={{
              width: responsiveWidth(34),
              height: responsiveHeight(12),
              borderRadius: responsiveWidth(1),
              marginRight: responsiveWidth(2),
            }}
            source={{
              uri:
            item?.image
              ? item?.image
              : PostsImageNotFound,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View>

          <Text
            style={{
              fontSize: responsiveFontSize(1.7),
              fontWeight: 'bold',
              color: colors.fullColorInverse,
            }}
            >
            {item?.label ? item.label : 'not Found'}
          </Text>
          </View>
          {/* </Text> */}
        </View>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RowStoriesCards);