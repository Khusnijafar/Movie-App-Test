import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return <MainNavigator />;
};

export default App;
