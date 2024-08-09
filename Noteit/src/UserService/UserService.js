import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

class UserService {


    static BASE_URL = 'http://192.168.3.53:8080';


    // Register for the new Person and Update by Passing the User iD
    static async register(register) {
        try {
            console.log('US Register Data :', register);  // While Deploying need to Commit this line
            const response = await axios.post(`${UserService.BASE_URL}/register`, register);
            // console.log('US Register Response :', response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Register Data of Perticular loggin person
    static async customerData(customerId) {
        try {
            console.log('US Cid :', customerId);  // While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/userDetails/${customerId}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Gettning the information of the ledger for perticular Barrower
    static async ledgerData(borrowerId) {
        try {
            console.log('US B_Id', borrowerId); // While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/ledger/${borrowerId}`);
            console.log(response.data);
            // console.log('name', response.data.borrowerName); // While Deploying need to Commit this line
            // console.log('In User Service', response.data); // While Deploying need to Commit this line
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Collecting the interest for the particular ledger id
    static async addEntry(interest) {
        try {
            // console.log(entry);
            const response = await axios.post(`${UserService.BASE_URL}/ledger/update`, interest);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Adding the new notes for the perticular customer id
    static async addingNotes(customerId) {
        try {
            console.log(" Adding Notes :", customerId);
            const response = await axios.get(`http://192.168.3.53:8080/${customerId}/selfnotes`);
            console.log("Status");
            console.log(response.data);
            console.log("Status", response.status);
            return response;
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