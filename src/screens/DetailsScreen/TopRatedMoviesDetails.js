import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, SIZES} from '../../constants';
import {lang} from '../../lang';

const TopRatedMoviesDetails = props => {
  const {
    poster_path,
    title,
    vote_average,
    overview,
    release_date,
    original_language,
  } = props.route.params;
  const [watchlist, setWatchlist] = useState(false);
  const [textWatchlist, setTextWatchlist] = useState(lang.addWatchlist);

  const handleWatchlist = () => {
    setWatchlist(!watchlist);
    if (watchlist) {
      setTextWatchlist(lang.addWatchlist);
    } else {
      setTextWatchlist(lang.removeWatchlist);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperCard}>
        <View style={styles.card}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
            }}
            resizeMode="cover"
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDate}>{release_date}</Text>
            <View style={styles.cardRatingAndLanguage}>
              <View style={styles.cardRating}>
                <AirbnbRating
                  count={5}
                  defaultRating={vote_average / 2}
                  size={20}
                  isDisabled={true}
                  showRating={false}
                  selectedColor={COLORS.primary}
                />
                <Text style={styles.cardRatingText}>{vote_average}</Text>
              </View>
              <Text style={styles.cardLanguageText}>
                Language : {original_language}
              </Text>
              <View style={styles.cardWatchlist}>
                <Ionicons
                  name={watchlist ? 'bookmark' : 'bookmark-outline'}
                  size={30}
                  color={watchlist ? COLORS.primary : COLORS.secondary}
                  onPress={handleWatchlist}
                />
                <Text style={styles.cardWatchlistText}>{textWatchlist}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardOverview}>
          <Text style={styles.synopsis}>{lang.Synopsis}</Text>
          <Text style={styles.cardOverviewText}>{overview}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopRatedMoviesDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperCard: {
    margin: SIZES.medium,
  },
  card: {
    flexDirection: 'row',
    width: '50%',
  },
  cardImage: {
    height: 280,
    width: 160,
  },
  cardDetails: {
    padding: 10,
  },
  cardTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  cardRatingAndLanguage: {
    position: 'absolute',
    bottom: 0,
  },
  cardRatingText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
  cardLanguageText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
  cardOverview: {
    marginTop: SIZES.medium,
  },
  synopsis: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  cardOverviewText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.small,
  },
  cardWatchlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.small,
    marginLeft: SIZES.small,
  },
  watchlist: {
    fontSize: SIZES.font,
    color: COLORS.gray,
  },
  cardWatchlistText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
  },
});
