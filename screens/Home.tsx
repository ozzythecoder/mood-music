import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const MOOD_COLORS = [
  { moodName: 'Happy', hexCode: '#ffd700' },
  { moodName: 'Sad', hexCode: '#4682b4' },
  { moodName: 'Energetic', hexCode: '#ff4500' },
  { moodName: 'Joyful', hexCode: '#ffa07a' },
  { moodName: 'Angry', hexCode: '#ff0000' },
  { moodName: 'Melancholy', hexCode: '#696969' },
  { moodName: 'Cheerful', hexCode: '#32cd32' },
  { moodName: 'Relaxed', hexCode: '#87ceeb' },
  { moodName: 'Focused', hexCode: '#000080' },
];

const numColumns = 3;
const margin = 2;
// this will definitely need to be updated to a more universal way of styling the buttons for different screen widths

const Home = () => {

  return (
    <FlatList
      data={MOOD_COLORS}
      keyExtractor={item => item.moodName}
      numColumns={numColumns}
      renderItem={({ item }) => {

        const textColor = parseInt(item.hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white';

        return (
          <TouchableOpacity
            style={[styles.button, { width: `${(100 - (margin * (numColumns + 1))) / numColumns}%`, backgroundColor: item.hexCode }]}
            onPress={() => {
              console.log(`Selected mood: ${item.moodName}`);
            }}
          >
            <Text style={[styles.buttonText, { color: textColor }]}>{item.moodName}</Text>
          </TouchableOpacity>
        );
      }}
    />
  )
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
})

export default Home;