import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerNames: [],
            playerColors: [],
        }
    }

    componentWillMount = () => {
        if (this.props.navigation.state.params.playerName && this.props.navigation.state.params.colors) {
            const { playerName, colors } = this.props.navigation.state.params
            this.setState({
                playerNames: playerName,
                playerColors: colors,
            })
        } else {
            alert("There is a problem with datas, the game cant begin")
        }
    }

    printProps = () => {
        console.log(this.state)
    }

    render() {
        return (
            <View>
                {this.state.playerNames ?
                    this.state.playerNames.map((value, index) => {
                        return (
                            <View key={index}>
                                <Text>{this.state.playerColors[index]}</Text>
                            </View>
                        )
                    })
                    : null}
                <Text onPress={this.printProps}>LE PALMIER THE GAME</Text>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
// });

export default App