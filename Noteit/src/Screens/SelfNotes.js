import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import UserService from '../UserService/UserService';

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
  const scrollViewRef = useRef(null); // Ref for ScrollView
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [highlightInput, setHighlightInput] = useState(false); // State to highlight input


  useEffect(() => {
    const fetchNotes = async () => {
      try {


        // const response = await axios.get(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`);

        const response = await UserService.displaySelfNotes(userInfo.id);

        const notesData = response;
        console.log('Fetched Notes:', notesData);
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:',error);
        if (error.response) {
          console.error('Error Response Data:', error);
          console.error('Error Response Status:', error);
        }
      }
    };

    if (userInfo && userInfo.id) {
      fetchNotes();
    }
  }, [userInfo]);

  useEffect(() => {
    // Scroll to the end when notes are updated
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [notes]);

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
      // const response = await axios.post(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`, newNote);

      const response = await UserService.addSelfNotes(userInfo.id,newNote);

      console.log('Note Saved:', response20);
      setNotes([...notes, response]);
    } catch (error) {
      console.error('Error saving note:', error);
      if (error.response) {
        console.error('Error Response Data:', error);
        console.error('Error Response Status:', error);
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
      // await axios.post(`http://192.168.3.53:8080/${userInfo.id}/selfnotes`, updatedNote);

      const response = await UserService.updateSelfNotes(userInfo.id, updatedNote);

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
      console.error('Error updating note:', error);
      if (error.response) {
        console.error('Error Response Data:', error);
        console.error('Error Response Status:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://192.168.3.53:8080/${userInfo.id}/selfnotes/${id}`);

      const response = await UserService.deleteSelfNotes(userInfo.id, id);

      const updatedNotes = notes.filter(note => note.id !== id);

      setNotes(updatedNotes);
      setOptionsVisible(false);
    } catch (error) {
      console.error('Error deleting note:', error);
      if (error.response) {
        console.error('Error Response Data:', error);
        console.error('Error Response Status:', error);
      }
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

  const toggleExpand = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  useEffect(() => {
    // Scroll to the input area if it's highlighted
    if (highlightInput && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 1000, animated: true }); // Adjust the y value as needed
    }
  }, [highlightInput]);

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

      <ScrollView
        contentContainerStyle={styles.content}
        ref={scrollViewRef} // Set ref here
      >
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
                <TouchableOpacity onPress={() => toggleExpand(note.id)}>
                  <Text
                    style={styles.noteBody}
                    numberOfLines={expandedNoteId === note.id ? undefined : 1} // Handle multi-line text based on expanded state
                  >
                    {note.notes}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.noteTimestamp}>{formatTime(note.createdTs)}</Text>
              </View>
            ))}
          </View>
        ))}

        {isAdding && (
          <View style={[styles.inputContainer, highlightInput && styles.highlightedInput]}>
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
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleEdit(selectedNoteId)}>
                <Text style={styles.modalButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleDelete(selectedNoteId)}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setOptionsVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {editNoteId && (
        <Modal
          transparent={true}
          visible={!!editNoteId}
          onRequestClose={() => setEditNoteId(null)}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.textArea}
                placeholder="Edit your note..."
                placeholderTextColor="#888"
                multiline
                value={editText}
                onChangeText={setEditText}
              />
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditNoteId(null)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
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
    minHeight: 80, // Set a minimum height
    maxHeight: 150, // Set a maximum height
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
    overflow: 'scroll', // Enable scrolling within the text area
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