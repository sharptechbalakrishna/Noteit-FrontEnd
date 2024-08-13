import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

class UserService {


    static BASE_URL = 'http://192.168.3.60:8080';


    // Sign Up for user with Mobile Number and password
    static async login(phoneNumber, password) {
        try {
            console.log("In US :", phoneNumber, password)
            const response = await axios.get(`${UserService.BASE_URL}/login`, {
                params: {
                    phone: phoneNumber,
                    password: password
                }
            })
            // console.log(response.data);
             console.log("In US :", phoneNumber, password)
            return response.data;
        } catch (err) {
            throw err;
        }
    }
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


    // Fetching Expense Tracker Data
    static async fetchExpenseTrackerData(customerId) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/get-expense-tracker`, {
                params: { customerId },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update Expense (either add income or expense)
    static async updateExpense(expenseData) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/update-expense`, expenseData);
            return response.data;
        } catch (err) {
            throw err;
        }
    }



}

export default UserService;