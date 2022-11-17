import React from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View} from 'react-native';

import TopRatedMovies from '../components/TopRatedMovies';
import PopularPeople from '../components/PopularPeople';
import PopularTVShows from '../components/PopularTVShows';

import {COLORS, SIZES} from '../constants';
import {lang} from '../lang';

const HomeScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrapper}>
          <Text style={styles.bodyText}>{lang.TopRatedMovies}</Text>
          <View style={styles.movieWrapper}>
            <TopRatedMovies data={props} />
          </View>
          <View style={{marginVertical: SIZES.medium}}>
            <Text style={styles.bodyText}>{lang.PopularPeople}</Text>
            <View style={styles.movieWrapper}>
              <PopularPeople />
            </View>
          </View>
          <View style={{marginVertical: SIZES.medium}}>
            <Text style={styles.bodyText}>{lang.PopularTVShows}</Text>
            <View style={styles.movieWrapper}>
              <PopularTVShows />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bodyWrapper: {
    marginHorizontal: SIZES.extraLarge,
    marginVertical: SIZES.large,
  },
  bodyText: {
    fontSize: SIZES.large + 2,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  movieWrapper: {
    marginTop: SIZES.base,
  },
});
