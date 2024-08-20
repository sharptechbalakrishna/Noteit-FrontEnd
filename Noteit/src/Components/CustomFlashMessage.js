// CustomFlashMessage.js
import { showMessage } from 'react-native-flash-message';

const customStyles = {
  success: {
    backgroundColor: '#28a745', // Green color for success
    color: '#fff', // White text color
    icon: 'success', // Icon to indicate success
  },
  error: {
    backgroundColor: '#dc3545', // Red color for danger/error
    color: '#fff', // White text color
    icon: 'danger', // Icon to indicate error
  },
};

const CustomFlashMessage = (type, title, description) => {
  showMessage({
    message: title,
    description: description,
    type: type,
    backgroundColor: customStyles[type].backgroundColor,
    color: customStyles[type].color,
    icon: { icon: customStyles[type].icon, position: 'left' },
    duration: 2000,  // Display duration in milliseconds
    floating: true,  // Make the toast floating above the content
    style: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      marginHorizontal: 10,
    },
    titleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    textStyle: {
      fontSize: 15,
      color: '#fff',
    }
  });
};

export default CustomFlashMessage;
