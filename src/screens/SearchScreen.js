import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS, SIZES} from '../constants';
import tmdb from '../api/tmdb';

const SearchScreen = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState('');
  const [textNoData, setTextNoData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchSearch = async () => {
      const {data} = await tmdb.get('search/movie', {
        params: {
          query: search,
        },
      });
      setTimeout(() => {
        setDataSearch(data.results);
        setLoading(false);
      }, 2000);
      if (data.results.length === 0) {
        setTextNoData('No Data Found');
      }
    };
    fetchSearch();
  }, [search]);

  console.log(dataSearch, 'dataSearch');

  const renderSearch = ({item}) => {
    return (
      <View style={styles.card}>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperView}>
        <TextInput
          placeholder="Search Movie"
          style={styles.searchBar}
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <Ionicons
          name="search"
          size={SIZES.large}
          color={COLORS.darkGray}
          style={styles.searchIcon}
        />
      </View>
      {dataSearch.length === 0 ? (
        <View style={styles.wrapperSearch}>
          <MaterialCommunityIcons
            name="movie-search"
            size={100}
            color={COLORS.darkBlue}
            style={styles.searchIconBig}
          />
          <Text style={styles.textSearchMovie}>{textNoData}</Text>
        </View>
      ) : (
        <>
          {loading ? (
            <SkeletonPlaceholder>
              <View style={styles.wrapperView}>
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
              </View>
            </SkeletonPlaceholder>
          ) : (
            <FlatList
              data={dataSearch}
              renderItem={renderSearch}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrapperView: {
    marginHorizontal: SIZES.extraLarge,
    marginVertical: SIZES.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    height: 50,
    paddingLeft: SIZES.medium,
    marginTop: SIZES.medium,
    width: '100%',
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  card: {
    height: 200,
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginLeft: SIZES.extraLarge,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  cardDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  searchIconBig: {
    marginBottom: SIZES.medium,
  },
  textSearchMovie: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  wrapperSearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonCard: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  skeletonCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  skeletonCardDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
