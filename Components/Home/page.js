import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends React.Component {
    
    navigate = (e) => {
        this.props.navigation.navigate(e)
    }

    render(){
        return (
            <View>
                <Button
                    onPress={()=>{this.navigate("palmier")}}
                    title="Palmier"
                    />
                <Button
                    onPress={()=>{this.navigate("rougeOuNoir")}}
                    title="Rouge Ou Noir"
                    />
            </View>
        )
    }
}

// const styles = StyleSheet.create({
// });

export default App