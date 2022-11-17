import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS, SIZES} from '../constants';
import {lang} from '../lang';
import tmdb from '../api/tmdb';

const UpcomingMovies = () => {
  const [dataUpcomingMovies, setDataUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchUpcomingMovies = async () => {
      const {data} = await tmdb.get('movie/upcoming');
      setTimeout(() => {
        setDataUpcomingMovies(data.results);
        setLoading(false);
      }, 2000);
    };

    fetchUpcomingMovies();
  }, []);

  const renderUpcomingMovies = ({item}) => {
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{lang.UpcomingMovies}</Text>
      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.skeletonWrapper}>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
            </View>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
            </View>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonCardImage} />
              <View style={styles.skeletonCardDetails} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={dataUpcomingMovies}
          renderItem={renderUpcomingMovies}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.extraLarge,
    marginVertical: SIZES.large,
  },
  textTitle: {
    fontSize: SIZES.large + 2,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  card: {
    marginVertical: SIZES.large,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  cardDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    margin: SIZES.small,
  },
  cardRating: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small,
  },
  cardRatingText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  skeletonWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.large,
  },
  skeletonCard: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.large,
  },
  skeletonCardImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  skeletonCardDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
  },
});
