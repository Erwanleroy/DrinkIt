import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../Home/page'
import Palmier from '../Palmier/page'
import RougeOuNoir from '../RougeOuNoir/page'

const SearchStackNavigator = createStackNavigator({
    Home:{
        screen: Home,
        navigationOptions: {
          title: 'Home'
        }
    },
    palmier:{
        screen: Palmier,
        navigationOptions: {
          title: 'Palmier'
        }
    },
    rougeOuNoir:{
        screen: RougeOuNoir,
        navigationOptions: {
          title: 'Rouge Ou Noir'
        }
    },
})

export default createAppContainer(SearchStackNavigator)