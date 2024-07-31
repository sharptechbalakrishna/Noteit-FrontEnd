import axios from 'axios';

class UserService {
    static BASE_URL = 'http://192.168.3.53:8080';

    static async register(register) {
        try {
            console.log('In User Service', register);  // While Deploying need to Commit this line
            const response = await axios.post(`${UserService.BASE_URL}/register`, register);
            console.log('In User Service', response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // static async borrowerData(userInfo, borrowerData) {
    //     try {
    //         const response = await fetch(`${UserService.BASE_URL}/${userInfo.id}/borrowerData`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(borrowerData),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to add borrower');
    //         }

    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error adding borrower:', error);
    //         throw error;
    //     }
    // }
}

export default UserService;