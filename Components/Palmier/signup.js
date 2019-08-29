import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { ListItem } from 'react-native-material-ui'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // format : [name, color]
            players: [],
            colorsAvailable: ["red", "yellow", "blue", "orange", "green", "purple", "black", "cyan", "navy", "plum"],
            colorAlreadyUsed: [],
            newPlayer: "",
            canLaunch: false
        }
    }

    navigate = (e) => {
        this.props.navigation.navigate(e)
    }


    //deny the back button
    componentDidMount = () => BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    componentWillUnmount = () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    handleBackButton = () => true


    randomInt = (e) => Math.floor(Math.random() * Math.floor(e));

    addNewPlayer = () => {
        if (this.state.newPlayer !== "" && this.state.colorsAvailable.length !== 0) {
            var id = this.randomInt(this.state.colorsAvailable.length)
            this.state.colorAlreadyUsed.push(this.state.colorsAvailable[id])
            // remove the chosen color
            this.state.colorsAvailable.splice(id, 1)
            var data = this.state.players
            data.push(this.state.newPlayer)
            if (data.length >= 3) {
                this.setState({ canLaunch: true })
            }
            this.setState({
                players: data,
                newPlayer: "",
            })
        } else if (this.state.colorsAvailable.length === 0) {
            alert("max player")
        }
    }

    removePlayer = (id) => {
        this.state.colorsAvailable.push(this.state.colorAlreadyUsed[id])
        this.state.colorAlreadyUsed.splice(id, 1)
        this.state.players.splice(id, 1)
        var newPlayerList = this.state.players
        this.setState({ players: newPlayerList })
        if (newPlayerList.length < 3) {
            this.setState({ canLaunch: false })
        }
    }

    launchGame = () => {
        this.props.navigation.navigate("palmier", { playerName: this.state.players, colors: this.state.colorAlreadyUsed })
    }

    render() {
        return (
            <View>
                <Button
                    title="Launch Game ?!"
                    disabled={!this.state.canLaunch}
                    onPress={this.launchGame}
                />
                <Input
                    value={this.state.newPlayer}
                    label="Player Name"
                    onChangeText={(text) => this.setState({ newPlayer: text })}
                />
                <Button
                    title=""
                    icon={<Icon
                        name='add'
                    />}
                    onPress={this.addNewPlayer}
                />
                {this.state.players.length > 0 ? (
                    <View>
                        <Text style={{ fontSize: 20 }}>Players</Text>
                        <Text style={{ position: "absolute", right: 0, fontSize: 20 }}>Colors</Text>
                    </View>
                ) : null}
                {this.state.players ?
                    this.state.players.map((value, index) => {
                        return (
                            <ListItem
                                key={index}
                                divider
                                centerElement={{
                                    primaryText: value,
                                }}
                                rightElement={
                                    <View style={{
                                        width: 60,
                                        height: 10,
                                        backgroundColor: this.state.colorAlreadyUsed[index]
                                    }}
                                    />
                                }
                                onLongPress={() => { this.removePlayer(index) }}
                            />
                        )
                    })
                    : null}
            </View>
        )
    }
}

// const styles = StyleSheet.create({
// });

export default App