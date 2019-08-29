import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../Home/page'
import SingInPalmier from '../Palmier/signup'
import Palmier from '../Palmier/theGame'
import RougeOuNoir from '../RougeOuNoir/page'

const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  palmier: {
    screen: Palmier,
    navigationOptions: {
      title: 'Palmier'
    }
  },
  signPalmier: {
    screen: SingInPalmier,
    navigationOptions: {
      title: 'Enter your names'
    }
  },
  rougeOuNoir: {
    screen: RougeOuNoir,
    navigationOptions: {
      title: 'Rouge Ou Noir'
    }
  },
})

export default createAppContainer(SearchStackNavigator)