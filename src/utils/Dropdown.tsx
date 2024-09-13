import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

const DropdownMenu = () => {
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [selectedFruitOne, setSelectedFruitOne] = useState<string>('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeSheet, setActiveSheet] = useState<number | null>(null); // Track which BottomSheet is active

  // List of fruits
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

  // Define snap points
  const snapPoints = ['20%'];

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Show Dropdown
  const showDropdown = (sheetNumber: number) => {
    setActiveSheet(sheetNumber);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0); // Snap to the first index to show the BottomSheet
    }
  };

  // Handle fruit selection
  const selectFruit = (fruit: string) => {
    if (activeSheet === 1) {
      setSelectedFruit(fruit);
    } else if (activeSheet === 2) {
      setSelectedFruitOne(fruit);
    }
    bottomSheetRef.current?.close(); // Close the BottomSheet
  };

  const handleSubmit = () => {
    console.log('Selected Fruit:', selectedFruit, selectedFruitOne);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          showSoftInputOnFocus={false}
          caretHidden
          style={styles.input}
          value={selectedFruit}
          placeholder="Select a fruit"
          onTouchStart={() => showDropdown(1)} // Open BottomSheet when input is focused
        />

        <TextInput
          showSoftInputOnFocus={false}
          caretHidden
          style={styles.input}
          value={selectedFruitOne}
          placeholder="Select a fruit"
          onTouchStart={() => showDropdown(2)} // Open BottomSheet when input is focused
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Text style={styles.selectedText}>Selected Fruit: {selectedFruit}</Text>
        <BottomSheet
          ref={bottomSheetRef}
          index={activeSheet !== null ? 0 : -1} // Only show BottomSheet if activeSheet is not null
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}>
          <BottomSheetView>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {fruits.map(fruit => (
                <TouchableOpacity
                  key={fruit}
                  style={styles.option}
                  onPress={() => selectFruit(fruit)}>
                  <Text style={styles.optionText}>{fruit}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 16, // Add some padding at the bottom
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
  },
  selectedText: {
    marginVertical: 20,
    fontSize: 18,
  },
  option: {
    padding: 16,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropdownMenu;
