import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import UpcomingMovies from '../components/UpcomingMovies';
import {COLORS} from '../constants';

const MoreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UpcomingMovies />
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
