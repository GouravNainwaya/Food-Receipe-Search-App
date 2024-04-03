import React, { Suspense, lazy, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { updateAllPosts, updateSelectedIndex } from '../redux/slices/scrollPageSlice';
import { setBlogs } from '../redux/slices/innerTabSlice';
import { setSelectedPostItem } from '../redux/slices/blogSlice';
import { increment } from '../redux/slices/counterSlice';
import colors from '../utlis/colors';

const RowStoriesCards = lazy(() => import('./RowStoriesCards'));
const BigNewsStoryCard = lazy(() => import('./BigNewsStoryCard'));

const RenderNewsCard = ({
  posts,
  categoryId,
  leftText,
  rightText,
  navigation,
  bigNews,
  rightTextonPress,
}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const isAndroid = Platform.OS === 'android';

  if (!posts) {
    return null;
  }

  return posts.map((item, index) => {
    if (index === 0) {
      return (
        <Suspense key={`post_${index}`} fallback={<></>}>
          <BigNewsStoryCard
            leftText={leftText}
            rightText={rightText}
            otherMatchingCategorie={leftText}
            showCategoryName={true}
            colors={colors}
            item={item}
            onPress={() => handlePress(index, item)}
          />
        </Suspense>
      );
    } else {
      return (
        <Suspense key={`post_${index}`} fallback={<></>}>
          <RowStoriesCards
            item={item}
            otherMatchingCategorie={leftText}
            showCategoryName={true}
            onPress={() => handlePress(index, item)}
            colors={colors}
          />
        </Suspense>
      );
    }
  });

  function handlePress(index, item) {
    dispatch(updateSelectedIndex(index));
    dispatch(setSelectedPostItem(item));
    dispatch(updateAllPosts(posts));
    dispatch(increment());
    navigation.navigate('ScrollPage', {
      selectedIndex: index,
      iswebstory: false,
      from: route?.name,
    });
  }
};

export default memo(RenderNewsCard);