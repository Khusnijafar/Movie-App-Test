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

const TopRatedMovies = props => {
  const {navigation} = props.data;
  const [dataTopRatedMovies, setDataTopRateMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchTopRatedMovies = async () => {
      const {data} = await tmdb.get('movie/top_rated');
      setTimeout(() => {
        setDataTopRateMovies(data.results);
        setLoading(false);
      }, 2000);
    };

    fetchTopRatedMovies();
  }, []);

  const renderTopRatedMovies = ({item}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TopRatedMoviesDetails', item)}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
            resizeMode="cover"
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.title}</Text>
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
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
          </View>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={dataTopRatedMovies}
          renderItem={renderTopRatedMovies}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TopRatedMovies;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 260,
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.base,
    borderRadius: SIZES.base,
  },
  cardImage: {
    width: 150,
    height: 200,
    borderRadius: SIZES.base,
  },
  cardDetails: {
    padding: SIZES.base,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  cardRating: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.base,
  },
  cardRatingText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  skeletonWrapper: {flexDirection: 'row', alignItems: 'center'},
  skeletonCard: {
    width: 150,
    height: 260,
    borderRadius: 10,
    marginRight: 12,
  },
});
