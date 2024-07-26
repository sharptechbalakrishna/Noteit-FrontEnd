import axios from "axios";


class UserService {

    

    static BASE_URL = "http://192.168.3.53:8080"

    static async register(register) {
        try {
            console.log("In User SErvice ", register)  // While Deploying need to Commit this line
            const response = await axios.post(`${UserService.BASE_URL}/register`,register)
            console.log("In User SErvice ", response.data)
            return response.data;
            

        } catch (err) {
            throw err;
        }
    }

}
export default UserService;
