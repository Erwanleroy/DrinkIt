import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends React.Component {
    
    navigate = (e) => {
        this.props.navigation.navigate(e)
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>En cours de construction peut etre disponible dans la prochaine mise a jour</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign:"center",
    }
});

export default App