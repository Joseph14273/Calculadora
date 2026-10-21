import { StyleSheet, Text, View } from 'react-native';

const Display = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        margin: 10,
        height: 100,
        width: '90%',
        alignItems: 'center',
    },
    text: {
        color: '#992e2e',
        fontSize: 24,
        textAlign: 'right',
    },
});

export default Display;
