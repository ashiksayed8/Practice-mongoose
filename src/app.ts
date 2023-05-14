import express, { Application,NextFunction,Request, Response } from 'express';
import cors from 'cors';
import { Schema, model } from 'mongoose';

const app: Application = express();

//Using Cors middleware----------------------------
app.use(cors());

//parse data-----------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    // res.send('Hello World!')
    // next();
    //Inserting a test data ino mongobd----------
    /*
    1. Interface
    2. Schema
    3. Model
    4. Database query
    */

    // 1. Create an interface representing a document in MongoDB.
    interface IUser {
        id: string;
        role: "Student";
        password: string;
        name: {
            firstName: string;
            middleName?: string;
            lastName: string;
        };
        dateOfBirth?: string;
        gender: "male|female";
        email?: string;
        contactNo: string;
        emergencyContact: string;
        presentAddress: string;
        permanentAddress: string;

    }

    // 2. Create a Schema corresponding to the document interface.

    const  userSchema = new Schema<IUser>({
        id : {type: String, required: true, unique: true},
        role: {type: String, required: true},
        password: {type: String, required: true},
        name: {
            firstName: {
                type: String,
                required: true
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true
            }
        },
        dateOfBirth:{ type: String},
        gender: {type: String, enum: ['male', 'female']},
        email: {type: String},
        contactNo: {type: String, requied: true},
        emergencyContact: {type: String, requied: true},
        presentAddress: {type: String, requied: true},
        permanentAddress: {type: String, requied: true}
    });


    //3. Create a model---------------
    const User = model('users', userSchema);

    const getDb = async() => {
        const user = new User({
            id: '34335',
            role: "Student",
            password: 'Ashik',
            name: {
                firstName: 'Ashikul',
                middleName: 'Islam',
                lastName: 'Atikul',
            },
            dateOfBirth: '23/05/2023',
            gender: "male",
            email: 'abc@gmail.com',
            contactNo: '000000000',
            emergencyContact: '4444444',
            presentAddress: 'Khulna',
            permanentAddress: 'Lohagara',
        });
        await user.save();
        console.log(user);
    }

    getDb();

    //-----------------
  });

  export default app;
  