import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

class App extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            players:[],
            newPlayer:"",
        }
    }

    navigate = (e) => {
        this.props.navigation.navigate(e)
    }

    addNewPlayer = () => {
        if(this.state.newPlayer!==""){
            data = this.state.players
            data.push(this.state.newPlayer)
            this.setState({
                players:data,
                newPlayer:"",
            })
        }
    }


    render(){
        return (
            <View>
                <Input  
                    label="Player Name" 
                    onChangeText={(text)=>this.setState({newPlayer:text})}
                    />
                <Button
                    title=""
                    icon={<Icon
                        name='add' 
                        />}
                    onPress={this.addNewPlayer}
                />
                
                <Text>Players :</Text>
                {this.state.players?
                    this.state.players.map((value,index)=>{
                        return(
                            <Text key={index}>{value}</Text>
                        )
                    })
                :null}
            </View>
        )
    }
}

// const styles = StyleSheet.create({
// });

export default App