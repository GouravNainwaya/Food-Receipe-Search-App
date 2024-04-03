import React, {lazy, memo, Suspense} from 'react';
import {View, Image, Text, StyleSheet, Pressable, Alert, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'; // Replace with correct imports
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replac
import {useDispatch} from 'react-redux';
import {decode} from 'html-entities';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import { PostsImageNotFound, replaceDomain } from '../utlis/helper';
import colors from '../utlis/colors';

const BigNewsStoryCard = ({
  item,
  titleStyle = {},
  containerStyle,
  onPress,
}) => {
  console.log("🚀 ~ file: BigNewsStoryCard.js:22 ~ item:", item)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
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
          },
          containerStyle,
        ]}>
        <Image
          source={{
            uri:
            item?.image
              ? item?.image
              : PostsImageNotFound,
          }}
          style={{
            width: '100%',
            // height: responsiveHeight(20),
            aspectRatio: 1 / 0.55, // Adjust the aspect ratio as needed
            // borderRadius: 8,
            marginBottom: responsiveHeight(1.5),
            // resizeMode: 'contain'
          }}
        />

        <Text
          style={[
            {
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
              color: colors.fullColorInverse,
              lineHeight: responsiveHeight(3),
              marginHorizontal: responsiveWidth(1),
              marginVertical: responsiveWidth(1),
            },
            titleStyle,
          ]}>
          {item?.label ? item.label : 'not Found'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BigNewsStoryCard);

const styles = StyleSheet.create({});
