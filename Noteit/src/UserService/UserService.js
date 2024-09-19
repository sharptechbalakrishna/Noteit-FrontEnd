import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

class UserService {


    static BASE_URL = 'http://192.168.3.154:8080';


    // Sign Up for user with Mobile Number and password
    // static async login(phoneNumber, password) {
    //     try {
    //         console.log("In US :", phoneNumber, password)
    //         const response = await axios.get(`${UserService.BASE_URL}/login`, {
    //             params: {
    //                 phone: phoneNumber,
    //                 password: password
    //             }
    //         })
    //         // console.log(response.data);
    //         console.log("In US :", phoneNumber, password)
    //         return response.data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }


    static async login(phoneNumber, password) {
        try {
            console.log("UserService login:", phoneNumber, password);
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
                phone: phoneNumber,  // Match this with what your backend expects
                password: password
            });
            console.log("Response data:", response.data);
            return response.data;
        } catch (err) {
            // console.error("Login error:", err);

            // Check if there's a response and status code
            if (err.response) {
                const statusCode = err.response.status;
                let errorMessage = '';

                switch (statusCode) {
                    case 401:
                        errorMessage = 'Invalid credentials. Please check your phone number or password.';
                        break;
                    case 403:
                        errorMessage = 'Net Work error';
                        break;
                    case 404:
                        errorMessage = 'Phone number not found. Please check your number and try again.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                    default:
                        errorMessage = 'An unexpected error occurred. Please try again.';
                }

                // Throw the error with a custom message based on the status code
                throw new Error(errorMessage);
            } else if (err.request) {
                // No response from the server (network error)
                throw new Error('Network error. Please check your internet connection.');
            } else {
                // Other errors
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    }

    static async register(register) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, register);
            console.log("User Service Response:", response.data); // Log the entire response
            return response.data;
        } catch (error) {
            console.error("User Service Error:", error); // Log the error details
            throw error;  // Throw error to be caught in `onSignUpPressed`
        }
    }

    static async passwordforgot(email) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/forgot-password`, email);
            console.log("User Service Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("User Service Error:", error);
            throw error;
        }
    }

    static async verifyOtpAndSetPassword({ email, otp, newPassword }) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/reset-password`, {
                email,
                otp,
                newPassword
            });
            console.log("User Service Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("User Service Error:", error);
            throw error;
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
    static async updateCustomer(updateData, userToken, customerData) {
        try {
            console.log('US Update Data :', updateData);  // Debug log
            const response = await axios.put(`${UserService.BASE_URL}/auth/updateCustomer`, updateData, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                params: {
                    customerId: customerData.id // Ensure the correct parameter is passed
                }
            });
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
    static async ledgerData(borrowerId, userToken) {
        try {
            console.log('US B_Id', borrowerId); // While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/ledger/${borrowerId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });

            return response.data;
        } catch (err) {
            throw err;
        }
    }


    // Collecting the interest for the particular ledger id
    static async addEntry(interest, userToken) {
        try {
            console.log("IN Us:", interest);
            const response = await axios.post(`${UserService.BASE_URL}/ledger/update`, interest, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            // console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    static async editEntry(editInterest, userToken) {
        try {
            console.log(editInterest);
            const response = await axios.post(`${UserService.BASE_URL}/edger/update`, editInterest, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    static async deleteLedger(lastBeforeId, borrowerId, userToken) {
        try {

            console.log("IN US -> ", lastBeforeId);
            console.log("IN US -> ", borrowerId);
            const response = await axios.delete(`${UserService.BASE_URL}/borrower/${borrowerId}/ledger/${lastBeforeId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /*------------------expense tracker----------------------*/

    // Fetching Expense Tracker Data
    static async fetchExpenseTrackerData(customerId, userToken) {
        try {
            console.log("F_Token", userToken);
            console.log("F_In use", customerId);
            const response = await axios.get(`${UserService.BASE_URL}/get-expense-tracker`, {
                params: { customerId },
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    // Update Expense (either add income or expense)
    static async updateExpense(expenseData, userToken) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/update-expense`, expenseData, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }



    /*------------------Borrower screen----------------------*/

    // Adding borrower details 
    static async borrowerdetails(customerId, borrowerData, userToken) {
        try {
            console.log('B_S borrowerdetails:', customerId, borrowerData, userToken);

            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/borrowers`, borrowerData, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            return response;
        }
        catch (err) {
            throw err;

        }
    }


    // displaying details in BorowerScreen
    static async displayBorrowers(customerId, userToken) {
        try {
            console.log('displayBorrowers :', customerId, userToken); //While Deploying need to Commit this line
            const response = await axios.get(`${UserService.BASE_URL}/${customerId}/borrowers`, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Passing token in Authorization header
                },
            });
            return response.data; // Returning data directly
        } catch (err) {
            throw err;
        }
    }

    /*------------------Self Notes----------------------*/


    //displaySelfNotes
    static async displaySelfNotes(customerId, userToken) {
        try {
            console.log('displaySelfNotes :', customerId, userToken);

            const response = await axios.get(`${UserService.BASE_URL}/${customerId}/selfnotes`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            return response.data; // Returning data directly
        } catch (err) {
            throw err;
        }
    }

    //addSelfNotes
    static async addSelfNotes(customerId, newNote, userToken) {
        try {
            console.log('addSelfNotes:', customerId, newNote, userToken)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/selfnotes`, newNote, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    //updateSelfNotes
    static async updateSelfNotes(customerId, updatedNote, userToken) {
        try {
            console.log('updateSelfNotes:', customerId, updatedNote, userToken)
            const response = await axios.post(`${UserService.BASE_URL}/${customerId}/selfnotes`, updatedNote, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    //deleteSelfNotes
    static async deleteSelfNotes(customerId, id, userToken) {
        try {
            console.log(customerId, id, userToken);
            const response = await axios.delete(`${UserService.BASE_URL}/${customerId}/selfnotes/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(response);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /*--------------------settings screen------------------------------*/
    // Changing The Password From Setting Screen
    static async changePassword(data, userToken) {
        try {
            console.log('changePassword', data, userToken);
            const response = await axios.post(`${UserService.BASE_URL}/change-password`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("Change Password Response: ", response.data);
            return response.data;
        } catch (err) {
            console.error("Error in changePassword:", err);
            throw err;
        }
    }

    // All data of the particular customer will be deleted
    static async deleteAccount(customerId, userToken) {
        try {
            console.log("IN US", customerId, userToken);
            const response = await axios.delete(`${UserService.BASE_URL}/deleteCustomer/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // particular borrower deleting in borrower profile screen
    static async deleteBorrower(customerId, borrowerId, userToken) {
        try {

            console.log("deleteBorrower", customerId, borrowerId, userToken);
            const response = await axios.delete(`${UserService.BASE_URL}/${customerId}/borrowers/${borrowerId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }



    static async reportBug(bugReport, userToken) {
        try {
            // console.log("IN US", bugReport);
            const response = await axios.post(`${UserService.BASE_URL}/send-bug-report`, {
                bugReport
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,  // Pass user token for authentication
                    'Content-Type': 'application/json',   // JSON request
                },
            });
            return response.data;
        } catch (err) {
            console.error("Error in reportBug:", err);
            throw err;
        }
    }

}






export default UserService;