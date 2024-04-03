import React, { memo } from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assuming you're using Expo for icons
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'; // Assuming you have responsive dimensions utility functions
import colors from '../utlis/colors';

const SearchInput = ({ handleSearch, searchInput }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: responsiveWidth(1),
        backgroundColor: colors.selectedCityTextInput,
        marginVertical: 10,
        marginTop: responsiveHeight(2.5),
      }}>
      <Ionicons
        name="search"
        size={24}
        color="gray"
        style={{ marginLeft: 10 }}
      />
      <TextInput
        placeholder="Search..."
        style={{
          flex: 1,
          height: 40,
          fontSize: responsiveFontSize(1.8),
          color: colors.fullColorInverse,
          backgroundColor: colors.selectedCityTextInput,
          borderRadius: responsiveWidth(1),
        }}
        placeholderTextColor="gray"
        onChangeText={handleSearch}
        value={searchInput}
      />
    </View>
  );
};

export default memo(SearchInput);
