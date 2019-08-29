import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends React.Component {

    navigate = (e) => {
        this.props.navigation.navigate(e)
    }

    render() {
        return (
            <View>
                <Button
                    onPress={() => { this.navigate("signPalmier") }}
                    title="Palmier (3-10 Joueurs)"
                />
                <Button
                    onPress={() => { this.navigate("rougeOuNoir") }}
                    title="Rouge Ou Noir"
                />
            </View>
        )
    }
}

// const styles = StyleSheet.create({
// });

export default App