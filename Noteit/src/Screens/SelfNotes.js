import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

// Helper function to format date
const formatDate = (date) => {
  const options = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Helper function to format time
const formatTime = (date) => {
  const options = {
    hour: 'numeric', minute: 'numeric',
  };
  return new Date(date).toLocaleTimeString(undefined, options);
};

// Function to group notes by date
const groupByDate = (notes) => {
  const grouped = {};
  notes.forEach(note => {
    const dateKey = formatDate(note.createdTs);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(note);
  });
  return grouped;
};

const SelfNotes = () => {
  const { userInfo } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`);
        const notesData = response.data;
        console.log('Fetched Notes:', notesData);
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
        if (error.response) {
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
        }
      }
    };

    if (userInfo && userInfo.id) {
      fetchNotes();
    }
  }, [userInfo]);

  const handleSave = async () => {
    const [title, ...bodyLines] = inputText.split('\n');
    const notesContent = bodyLines.join('\n').trim();
    console.log('Title:', title);
    console.log('Notes:', notesContent);

    if (!title.trim() || !notesContent.trim()) return;

    const newNote = {
      title: title.trim(),
      notes: notesContent.trim(),
      createdTs: new Date().toISOString(),
      updatedTs: new Date().toISOString()
    };

    try {
      const response = await axios.post(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`, newNote);
      console.log('Note Saved:', response.data);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error saving note:', error.message);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
      }
    }

    setIsAdding(false);
    setInputText('');
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setEditNoteId(id);
    setEditText(`${noteToEdit.title}\n${noteToEdit.notes}`);
    setOptionsVisible(false);
  };

  const handleUpdate = async () => {
    const [title, ...bodyLines] = editText.split('\n');
    const body = bodyLines.join('\n').trim();
    if (!title.trim() || !body.trim()) return;
  
    const updatedNote = {
      ...notes.find(note => note.id === editNoteId),
      title: title.trim(),
      notes: body.trim(),
      updatedTs: new Date().toISOString()
    };
  
    try {
      await axios.post(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`, updatedNote);
      const updatedNotes = notes.map(note =>
        note.id === editNoteId
          ? updatedNote
          : note
      );
  
      console.log('Updated Note:', updatedNote);
  
      setNotes(updatedNotes);
      setEditNoteId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating note:', error.message);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete note with ID: ${id}`);
      
      // Send DELETE request to the server
      const response = await axios.delete(`http://192.168.3.53:8080/${userInfo.id}/selfnotes/${id}`);
      
      console.log('Delete Response Status:', response.status); // Log the response status
  
      if (response.status === 204) { // HTTP 204 No Content indicates successful deletion
        // Update local state only after successful deletion
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        console.log('Note successfully deleted from server.');
      } else {
        console.log('Failed to delete note from server.');
      }
  
      // Close options modal
      setOptionsVisible(false);
    } catch (error) {
      console.error('Error deleting note:', error.message);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
  
      // Optionally, you might want to show an error message to the user here
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.notes.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Text style={styles.noteBody}>{note.notes}</Text>
                <Text style={styles.noteTimestamp}>{formatTime(note.createdTs)}</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {optionsVisible && (
        <Modal
          transparent={true}
          visible={optionsVisible}
          onRequestClose={() => setOptionsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => handleEdit(selectedNoteId)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(selectedNoteId)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOptionsVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {editNoteId !== null && (
        <Modal
        transparent={true}
        visible={editNoteId !== null}
        onRequestClose={() => setEditNoteId(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.editModalWrapper}>
            <ScrollView contentContainerStyle={styles.editModalContent}>
              <TextInput
                style={styles.textAreaUpdate}
                placeholder="Edit your note..."
                placeholderTextColor="#888"
                multiline
                value={editText}
                onChangeText={setEditText}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdate}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditNoteId(null)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  editModalWrapper: {
    width: '80%', // Adjust width as needed
    maxWidth: 600, // Maximum width of the modal
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Shadow for better visibility
  },
  editModalContent: {
    paddingBottom: 20, // Space for the action buttons
  },
  textAreaUpdate: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    height: 150, // Adjust height as needed
    marginBottom: 20, // Space for the action buttons
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