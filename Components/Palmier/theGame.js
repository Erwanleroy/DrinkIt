import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Button } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { Image, Input } from 'react-native-elements';
import { ListItem } from 'react-native-material-ui'

// oklm.map((value)=>{console.log("{"+value[1]+value[0]+" : require(\"../../Cards/"+value[0]+value[1]+".png\")},")})
const requireList = {
    trefle1: require("../../Cards/1trefle.png"),
    pique1: require("../../Cards/1pique.png"),
    coeur1: require("../../Cards/1coeur.png"),
    carreau1: require("../../Cards/1carreau.png"),
    trefle2: require("../../Cards/2trefle.png"),
    pique2: require("../../Cards/2pique.png"),
    coeur2: require("../../Cards/2coeur.png"),
    carreau2: require("../../Cards/2carreau.png"),
    trefle3: require("../../Cards/3trefle.png"),
    pique3: require("../../Cards/3pique.png"),
    coeur3: require("../../Cards/3coeur.png"),
    carreau3: require("../../Cards/3carreau.png"),
    trefle4: require("../../Cards/4trefle.png"),
    pique4: require("../../Cards/4pique.png"),
    coeur4: require("../../Cards/4coeur.png"),
    carreau4: require("../../Cards/4carreau.png"),
    trefle5: require("../../Cards/5trefle.png"),
    pique5: require("../../Cards/5pique.png"),
    coeur5: require("../../Cards/5coeur.png"),
    carreau5: require("../../Cards/5carreau.png"),
    trefle6: require("../../Cards/6trefle.png"),
    pique6: require("../../Cards/6pique.png"),
    coeur6: require("../../Cards/6coeur.png"),
    carreau6: require("../../Cards/6carreau.png"),
    trefle7: require("../../Cards/7trefle.png"),
    pique7: require("../../Cards/7pique.png"),
    coeur7: require("../../Cards/7coeur.png"),
    carreau7: require("../../Cards/7carreau.png"),
    trefle8: require("../../Cards/8trefle.png"),
    pique8: require("../../Cards/8pique.png"),
    coeur8: require("../../Cards/8coeur.png"),
    carreau8: require("../../Cards/8carreau.png"),
    trefle9: require("../../Cards/9trefle.png"),
    pique9: require("../../Cards/9pique.png"),
    coeur9: require("../../Cards/9coeur.png"),
    carreau9: require("../../Cards/9carreau.png"),
    trefle10: require("../../Cards/10trefle.png"),
    pique10: require("../../Cards/10pique.png"),
    coeur10: require("../../Cards/10coeur.png"),
    carreau10: require("../../Cards/10carreau.png"),
    trefle11: require("../../Cards/11trefle.png"),
    pique11: require("../../Cards/11pique.png"),
    coeur11: require("../../Cards/11coeur.png"),
    carreau11: require("../../Cards/11carreau.png"),
    trefle12: require("../../Cards/12trefle.png"),
    pique12: require("../../Cards/12pique.png"),
    coeur12: require("../../Cards/12coeur.png"),
    carreau12: require("../../Cards/12carreau.png"),
    trefle13: require("../../Cards/13trefle.png"),
    pique13: require("../../Cards/13pique.png"),
    coeur13: require("../../Cards/13coeur.png"),
    carreau13: require("../../Cards/13carreau.png"),
    none: require("../../Cards/none.png")
}

const NUMEROCARTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const FORMESCARTES = ["trefle", "pique", "coeur", "carreau"]

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            diablePlayButton: false,
            gameBegun: false,
            playerNames: [],
            playerColors: [],
            whoPlay: 0,
            cartesRestantes: [],
            cartesTirees: [],
            carteActuelle: ["none", ""],
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
            this.setState({ whoPlay: playerName.length - 1 })
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
            alert("Paquet epuise.. ca repart ?")
            this.setState({
                gameBegun: false,
                whoPlay: this.state.playerNames.length - 1,
                cartesRestantes: [],
                cartesTirees: [],
                carteActuelle: ["none", ""],
                gameSentence: '',
                mult: 1,
                rules: [],
                newRuleDialog: false,
                newRuleTmp: '',
            }, () => {
                for (let i = 0; i < NUMEROCARTES.length; i++) {
                    for (let j = 0; j < FORMESCARTES.length; j++) {
                        this.state.cartesRestantes.push([NUMEROCARTES[i], FORMESCARTES[j]])
                    }
                }
            })
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
                })
                break;
            default:
                alert("wtf")
                break;
        }
    }

    play = () => {
        // this.setState({ gameBegun: true })
        !this.state.gameBegun ? this.setState({ gameBegun: true }) : null
        if (this.state.whoPlay === this.state.playerNames.length - 1) {
            this.setState({ whoPlay: 0 })
        } else {
            this.setState({ whoPlay: this.state.whoPlay + 1 })
        }
        this.setState({ diablePlayButton: true })
        setTimeout(() => {
            this.setState({ diablePlayButton: false })
        }, 3);
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
                                    {this.state.playerColors[index] === "black" ||
                                        this.state.playerColors[index] === "purple" ||
                                        this.state.playerColors[index] === "purple" ||
                                        this.state.playerColors[index] === "navy" ||
                                        this.state.playerColors[index] === "blue" ? (
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
                {this.state.gameBegun ? (
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: this.state.playerColors[this.state.whoPlay],
                            backgroundColor: "lightgrey",
                        }}>
                        {this.state.playerNames[this.state.whoPlay]}
                        {"\n"}
                        {this.state.gameSentence}
                    </Text>
                ) : (
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Piochez une carte
                        {"\n"}
                            Pour lancer le jeu
                    </Text>
                    )}
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

                {/* dynamic img! */}
                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 50
                    }}
                >
                    <TouchableWithoutFeedback disabled={this.state.diablePlayButton} onPress={this.play} >
                        <Image
                            source={requireList[this.state.carteActuelle[1] + this.state.carteActuelle[0]]}
                            style={{ width: 90, height: 150 }}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <Text>Cartes restantes: {this.state.cartesRestantes.length}</Text>
                {this.state.rules.length !== 0 ? (<Text style={{ fontSize: 20 }}>Regles : </Text>) : null}
                {this.state.rules !== [] || this.state.rules !== undefined ?
                    this.state.rules.map((value, index) => {
                        return (
                            <ListItem
                                key={index}
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