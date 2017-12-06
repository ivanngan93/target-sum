import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import RandomNumber from './RandomNumber.js';

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired
    };

    state = {
        selectedNumber: []
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumber.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumber: [...prevState.selectedNumber, numberIndex]
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) => 
                        <RandomNumber 
                            key={index} 
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index)}
                            onPress={this.selectNumber} />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30
    },
    target: {
        fontSize: 50,
        backgroundColor: '#bbb',
        margin: 50,
        textAlign: 'center'
    },
    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});

export default Game;