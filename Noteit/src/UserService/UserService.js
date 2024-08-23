import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

class UserService {


    static BASE_URL = 'http://192.168.3.104:8080';


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
    static async logout(customerId) {
        try {
            console.log("In USL :", customerId)
            // const response = await axios.post(`${UserService.BASE_URL}${customerId}/logout`)
            // console.log(response.data);
            // return response.data;
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
            // console.log(response.data);
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
            console.log("IN Us:", interest);
            const response = await axios.post(`${UserService.BASE_URL}/ledger/update`, interest);
            // console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async editEntry(editInterest) {
        try {
            console.log(editInterest);
            const response = await axios.post(`${UserService.BASE_URL}/edger/update`, editInterest);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /*------------------expense tracker----------------------*/

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
    /*------------------Borrower screen----------------------*/

    // Adding borrower details 
    static async borrowerdetails(customerId, borrowerData) {
        try {
            console.log('customerId checking:', customerId);
            console.log('customerId borrowerData:', borrowerData);
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/borrowers`, borrowerData);

            return response;
        }
        catch (err) {
            throw err;

        }
    }


    // displaying details in BorowerScreen
    static async displayBorrowers(customerId) {
        try {
            console.log('displayBorrowersa :', customerId); //While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/${customerId}/borrowers`);
            return response.data; // Returning data directly
        } catch (err) {
            throw err;
        }
    }

    /*------------------Self Notes----------------------*/


    //displaySelfNotes
    static async displaySelfNotes(customerId) {
        try {
            console.log('displaySelfNotes :', customerId); //While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/${customerId}/selfnotes`);
            return response.data; // Returning data directly
        } catch (err) {
            throw err;
        }
    }
    //addSelfNotes
    static async addSelfNotes(customerId, newNote) {
        try {
            console.log(customerId, newNote)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/selfnotes`, newNote);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    //updateSelfNotes
    static async updateSelfNotes(customerId, updatedNote) {
        try {
            console.log(customerId, updatedNote)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/selfnotes`, updatedNote);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    //deleteSelfNotes
    static async deleteSelfNotes(customerId, id) {
        try {
            console.log(customerId, id)
            const response = await axios.delete(`${UserService.BASE_URL}/${customerId}/selfnotes`, id);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Changing The Password From Setting Screen
    static async changePassword(data) {
        try {
            console.log("IN US", data)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/changePassword`, data);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    // All data of the particular customer will be deleted
    static async deleteAccount(customerId) {
        try {

            console.log("IN US", customerId)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async deleteLedger(lastBeforeId, borrowerId) {
        try {

            console.log("IN US -> ", lastBeforeId);
            console.log("IN US -> ", borrowerId);
            const response = await axios.delete(`${UserService.BASE_URL}/borrower/${borrowerId}/ledger/${lastBeforeId}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async deleteBorrower(customerId, borrowerId) {
        try {

            console.log("In US", customerId, borrowerId);
            const response = await axios.delete(`${UserService.BASE_URL}/${customerId}/borrowers/${borrowerId}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }




}




export default UserService;