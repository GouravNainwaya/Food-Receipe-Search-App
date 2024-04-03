import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  Suspense,
  lazy,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import {useGetRecipesQuery} from '../../redux/slices/apiSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Replace with the desired icon library
import colors from '../../utlis/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SearchInput from '../../components/SearchInput';
import ScreenWrapper from '../../components/ScreenWrapper';
const RowStoriesCards = lazy(() => import('../../components/RowStoriesCards'));
const BigNewsStoryCard = lazy(() =>
  import('../../components/BigNewsStoryCard'),
);

export function handlePress(item, navigation) {
  navigation.navigate('Details', {item});
}

const ListItemComponent = ({item, index, handlePress, navigation}) => {
  return (
    <Suspense
      key={`post_${index}`}
      fallback={<Text style={{}}>Loading...</Text>}>
      {index === 0 ? (
        <BigNewsStoryCard
          colors={colors}
          item={item.recipe}
          onPress={() => handlePress(item.recipe, navigation)}
        />
      ) : (
        <RowStoriesCards
          item={item.recipe}
          onPress={() => handlePress(item.recipe, navigation)}
          colors={colors}
        />
      )}
    </Suspense>
  );
};

const Home = ({navigation}) => {

  useEffect(() => {
    console.log('🚀 ~ file: Home.js:10 ~ Home ~ data:', data);
  }, [data, searchInput]);
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = useCallback(text => {
    setSearchInput(text);
  }, []);

  const {data, error, isLoading, isFetching} = useGetRecipesQuery({
    query: searchInput,
  });

  let content = null;

  if (isLoading || isFetching) {
    content = <Text>Loading...</Text>;
  } else if (error) {
    content = <Text>Error: {error.message}</Text>;
  } else {
    // Render your data here
    // For example:
    // content = <Text>{JSON.stringify(data?.hits)}</Text>;
  }

  return (
    <ScreenWrapper>
      <SearchInput handleSearch={handleSearch} searchInput={searchInput} />
      {isLoading || isFetching ? (
        <ActivityIndicator
          style={{flex: 1}}
          size="large"
          color={colors.fullColorInverse}
        />
      ) : (
        <FlatList
          data={data?.hits || []}
          renderItem={({item, index}) => (
            <ListItemComponent
              item={item}
              index={index}
              handlePress={handlePress}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => `post_${index}`}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: colors.gray, textAlign: 'center'}}>No data available</Text>
                <Text style={{ color: colors.gray , textAlign: 'center'}}>
                  You Have to Search a Valid Recipe First
                </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenWrapper>
  );
};

export default memo(Home);

const styles = StyleSheet.create({});
