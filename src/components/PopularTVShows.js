import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS, SIZES} from '../constants';
import tmdb from '../api/tmdb';

const PopularTVShows = () => {
  const [dataPopularTVShows, setDataPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPopularTVShows = async () => {
      const {data} = await tmdb.get('tv/popular');
      setTimeout(() => {
        setDataPopularTVShows(data.results);
        setLoading(false);
      }, 2000);
    };

    fetchPopularTVShows();
  }, []);

  const renderPopularTVShows = ({item}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
            resizeMode="cover"
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <View style={styles.cardRating}>
            <Text style={styles.cardRatingText}>{item.vote_average}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.skeletonWrapper}>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
              <View style={styles.skeletonCardRating} />
            </View>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
              <View style={styles.skeletonCardRating} />
            </View>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
              <View style={styles.skeletonCardRating} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={dataPopularTVShows}
          renderItem={renderPopularTVShows}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PopularTVShows;

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  cardImage: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  cardDetails: {
    padding: 10,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  cardRating: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRatingText: {
    color: COLORS.white,
    fontSize: SIZES.h4,
  },
  skeletonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonCard: {
    width: 150,
    height: 260,
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.base,
    borderRadius: SIZES.base,
  },
  skeletonCardImage: {
    width: 150,
    height: 200,
    borderRadius: SIZES.base,
  },
  skeletonCardDetails: {
    width: 150,
    height: 20,
    marginTop: SIZES.base,
  },
  skeletonCardRating: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
