import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { Input } from 'react-native-elements';
import { ListItem } from 'react-native-material-ui'
const NUMEROCARTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const FORMESCARTES = ["trefle", "pique", "coeur", "carreau"]

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerNames: [],
            playerColors: [],
            whoPlay: 0,
            cartesRestantes: [],
            cartesTirees: [],
            carteActuelle: [],
            gameSentence: '',
            mult: 1,
            rules: [],
            newRuleDialog: false,
            newRuleTmp: '',
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
        for (let i = 0; i < NUMEROCARTES.length; i++) {
            for (let j = 0; j < FORMESCARTES.length; j++) {
                this.state.cartesRestantes.push([NUMEROCARTES[i], FORMESCARTES[j]])
            }
        }
    }

    randomInt = e => Math.floor(Math.random() * Math.floor(e));

    pickRandomCard = () => {
        if (this.state.cartesRestantes.length !== 0) {
            var idCard = this.randomInt(this.state.cartesRestantes.length)
            var carteActuelle = this.state.cartesRestantes[idCard]
            this.state.cartesRestantes.splice(idCard, 1)
            this.state.cartesTirees.push(carteActuelle)
            this.setState({ carteActuelle: carteActuelle }, () => this.handleGameSentence())
        } else {
            alert("Plus de cartes deso pas deso")
        }
    }

    handleGameSentence = () => {
        var sentence
        var carte = this.state.carteActuelle
        if (carte[0] < 11) {
            if (carte[1] === "coeur" || carte[1] === "carreau") {
                sentence = "Tu donnes "
            } else {
                sentence = "Tu bois "
            }
            sentence += carte[0] * this.state.mult + " gorgees"
            this.setState({ mult: 1 })
        } else if (carte[0] === 11) {
            sentence = "Les anciennes regles sont abandonnees"
            this.setState({ rules: [] })
        } else if (carte[0] === 12) {
            sentence = "Vous pouvez creer une regle"
            this.newRule(0)
        } else if (carte[0] === 13) {
            sentence = "Prochain tour c'est x" + (this.state.mult + 1)
            this.setState({ mult: this.state.mult + 1 })
        }
        this.setState({ gameSentence: sentence })
    }


    newRule = (e) => {
        // e===0 open prompt box
        // e===1 add the rule
        switch (e) {
            case 0:
                this.setState({ newRuleDialog: true })
                break;
            case 1:
                var actualRules = this.state.rules
                actualRules.push(this.state.newRuleTmp)
                this.setState({
                    newRuleDialog: false,
                    newRuleTmp: '',
                    rules: actualRules
                }, () => { console.log(this.state.rules) })
                break;
            default:
                alert("wtf")
                break;
        }
    }

    play = () => {
        if (this.state.whoPlay === this.state.playerNames.length - 1) {
            this.setState({ whoPlay: 0 })
        } else {
            this.setState({ whoPlay: this.state.whoPlay + 1 })
        }
        this.pickRandomCard()
    }

    render() {
        return (
            <View>
                {/* print All players with them color */}
                <ScrollView
                    style={{
                        flexDirection: "row",
                    }}
                    horizontal={true}
                >
                    {this.state.playerNames ?
                        this.state.playerNames.map((value, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        margin: 10,
                                        overflow: "hidden",
                                        justifyContent: "center",
                                        borderRadius: 50,
                                        width: 50,
                                        height: 50,
                                        backgroundColor: this.state.playerColors[index],
                                    }}
                                >
                                    {this.state.playerColors[index] === "black" || this.state.playerColors[index] === "purple" || this.state.playerColors[index] === "purple" || this.state.playerColors[index] === "navy" || this.state.playerColors[index] === "blue" ? (
                                        <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}
                                            onPress={() => { alert(value) }}
                                        >
                                            {value[0]}
                                        </Text>
                                    ) : (
                                            <Text style={{ textAlign: "center", fontSize: 20 }}
                                                onPress={() => { alert("Pseudo : " + value) }}
                                            >
                                                {value[0]}
                                            </Text>
                                        )}
                                </View>
                            )
                        })
                        : null}
                </ScrollView>
                <Button title="Play" onPress={this.play} />
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: this.state.playerColors[this.state.whoPlay]

                    }}
                >
                    {this.state.playerNames[this.state.whoPlay]}
                </Text>
                <Text>cartes restantes: {this.state.cartesRestantes.length}</Text>
                <Text>{this.state.carteActuelle[0]}{this.state.carteActuelle[1]}</Text>
                <Text>{this.state.gameSentence}</Text>
                <MaterialDialog
                    title="Ajouter une nouvelle regle :"
                    visible={this.state.newRuleDialog}
                    onOk={() => this.newRule(1)}
                    cancelLabel=""
                    onCancel={() => this.setState({ newRuleDialog: true })}
                >
                    <Input
                        value={this.state.newRuleTmp}
                        label="Add Rule"
                        onChangeText={(text) => this.setState({ newRuleTmp: text })}
                    />
                </MaterialDialog>
                {this.state.rules !== [] || this.state.rules !== undefined ?
                    this.state.rules.map((value, index) => {
                        return (
                            <ListItem
                                key={index}
                                divider
                                centerElement={{
                                    primaryText: value,
                                }}
                            />
                        )
                    })
                    : null}
            </View>
        )
    }
}

export default App