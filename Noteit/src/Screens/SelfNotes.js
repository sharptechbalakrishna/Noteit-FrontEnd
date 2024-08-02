import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Helper function to format date
const formatDate = (date) => {
  const options = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
};

// Helper function to format time
const formatTime = (date) => {
  const options = {
    hour: 'numeric', minute: 'numeric',
  };
  return date.toLocaleTimeString(undefined, options);
};

// Function to group notes by date
const groupByDate = (notes) => {
  const grouped = {};
  notes.forEach(note => {
    const dateKey = formatDate(note.timestamp);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(note);
  });
  return grouped;
};

const SelfNotes = () => {
  const [inputText, setInputText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note Title 1', body: 'This is the first sample note.', timestamp: new Date() },
    { id: 2, title: 'Note Title 2', body: 'This is the second sample note.', timestamp: new Date() },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleSave = () => {
    const [title, ...bodyLines] = inputText.split('\n');
    const body = bodyLines.join('\n').trim();
    if (!title.trim() || !body.trim()) return; // Prevent saving if title or note is empty

    const newNote = {
      id: notes.length + 1, // Generate a new ID
      title: title.trim(),
      body: body.trim(),
      timestamp: new Date(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setIsAdding(false);
    setInputText('');
    setOptionsVisible(false);

    // Log the updated notes array to the console
    console.log('Updated Notes:', updatedNotes);
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setEditNoteId(id);
    setEditText(`${noteToEdit.title}\n${noteToEdit.body}`);
    setOptionsVisible(false);
  };

  const handleUpdate = () => {
    const [title, ...bodyLines] = editText.split('\n');
    const body = bodyLines.join('\n').trim();
    if (!title.trim() || !body.trim()) return; // Prevent updating if title or note is empty

    const updatedNotes = notes.map(note =>
      note.id === editNoteId
        ? { ...note, title: title.trim(), body: body.trim(), timestamp: new Date() }
        : note
    );
    setNotes(updatedNotes);
    setEditNoteId(null);
    setEditText('');

    // Log the updated notes array to the console
    console.log('Updated Notes:', updatedNotes);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    setOptionsVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedNotes = groupByDate(filteredNotes);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="pencil" size={20} color="#fff" />
        <Text style={styles.headerTitle}>Self Notes</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {Object.keys(groupedNotes).map(dateKey => (
          <View key={dateKey}>
            <Text style={styles.dateHeader}>{dateKey}</Text>
            {groupedNotes[dateKey].map((note) => (
              <View key={note.id} style={[styles.noteContainer, selectedNoteId === note.id && styles.selectedNote]}>
                <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <TouchableOpacity onPress={() => {
                    setSelectedNoteId(note.id);
                    setOptionsVisible(true);
                  }}>
                    <Icon name="ellipsis-v" size={24} color="#007bff" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.noteBody}>{note.body}</Text>
                <Text style={styles.noteTimestamp}>{formatTime(note.timestamp)}</Text>
              </View>
            ))}
          </View>
        ))}

        {isAdding && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter title on the first line, then your note on the next lines."
              placeholderTextColor="#888"
              multiline
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {!isAdding && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Options Modal */}
      <Modal
        transparent
        visible={optionsVisible}
        onRequestClose={() => setOptionsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleEdit(selectedNoteId)}
            >
              <Text style={styles.modalButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleDelete(selectedNoteId)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOptionsVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        transparent
        visible={editNoteId !== null}
        onRequestClose={() => setEditNoteId(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.editModalContent}>
            <ScrollView>
              <TextInput
                style={styles.textArea}
                placeholder="Edit title and note..."
                placeholderTextColor="#888"
                multiline
                value={editText}
                onChangeText={setEditText}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdate} >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditNoteId(null)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingBottom: 80, // Space for the add button
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    justifyContent:'center',
    textAlign:'center'
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    position: 'relative', // Ensure positioning context for absolute positioning
    flexDirection: 'column', // Use column direction to stack elements vertically
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#333',
    
  },
  noteBody: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    marginBottom: 20, // Add bottom margin to ensure space for timestamp

  },
  noteTimestamp: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    bottom: 10, // Place at the bottom
    right: 10,  // Align to the right
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#eb6928',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    // backgroundColor: '#007bff',
    
  },
  modalButtonText: {
    color:'black',
        fontSize: 16,
  },
  editModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin:10
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#6fbee8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin:10
  },
  updateButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default SelfNotes;
