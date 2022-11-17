import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS, SIZES} from '../constants';
import tmdb from '../api/tmdb';

const PopularPeople = () => {
  const [dataPopularPeople, setDataPopularPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPopularPeople = async () => {
      const {data} = await tmdb.get('person/popular');
      setTimeout(() => {
        setDataPopularPeople(data.results);
        setLoading(false);
      }, 2000);
    };

    fetchPopularPeople();
  }, []);

  const renderPopularPeople = ({item}) => {
    return (
      <View>
        <View style={styles.card}>
          <TouchableOpacity>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
              }}
              resizeMode="cover"
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
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
          data={dataPopularPeople}
          renderItem={renderPopularPeople}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PopularPeople;

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginHorizontal: SIZES.base,
  },
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  cardDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.base,
    marginTop: SIZES.base,
  },
  cardTitle: {
    color: COLORS.darkGray,
  },
  skeletonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonCard: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  skeletonCardImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  skeletonCardDetails: {
    width: 100,
    height: 20,
    marginTop: 10,
  },
});
