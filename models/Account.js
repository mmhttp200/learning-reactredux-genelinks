/**
 * Account.js
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { customAlphabet } = require('nanoid');
const AccountSchema = require('../schemas/Account');
const LinkSchema = require('../schemas/Link');

class Account{
    constructor(){}

    /**
     * @desc Verify if the email and password are according to the pattern
     * Verify if the password == re_password
     * Verify if the email is already in use on database
     * Try to create a new account and return a literal object according the result.
     * @returns {literal object} {success: true, message} if the registration was successful
     * @returns {literal object} {success: false, message} if the registration failed.
     * @param {string} fullname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} re_password 
     */
    async register(fullname, email, password, re_password){
        const emailPatternVerification = this.verifyEmailPattern(email);
        if(!emailPatternVerification) return {success: false, message: "Please, write a valid email."};

        const passwordPatternVerification = this.verifyPasswordPattern(password);
        if(!passwordPatternVerification) return {success: false, message: "Please, write a valid password."};

        const emailInDBVerification = await this.verifyEmailInDB(email);
        if(emailInDBVerification.success) return {success: false, message: "Please choose another email, because this is already in use."};

        const nanoid = await this.generateNanoID();
        if(!nanoid.success) return {success: false, message: "Try again later, we are having some internal errors."};

        const hash = await this.encryptPassword(password);

        const result = await this.save(fullname, email, hash.password, nanoid.nanoid);
        if(!result.success) return {success: false, message: "Try again later, we are having some internal erros."}

        return {success: true, message: "The new account was created with successful."};

    }

    /**
     * @desc Save a new account on database.
     * @returns {literal object} {success: true} if the new account was created.
     * @param {string} fullname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} nanoid 
     */
    async save(fullname, email, password, nanoid){
        const newAccount = new AccountSchema({fullname, nanoid, email, password });
        const result = await newAccount.save()
        .then((data)=>{
            if(data) return {success: true};
            return {success: false};
        })
        .catch((err)=>{
            console.error(`\nContext: models/Account/save\n`);
            console.error(`\n${err.message}\n`);
            return {success: false};
        });

        return result;
    }

    /**
     * @desc To do login.
     * @returns {literal object} {success: true, token: {_id}, data: {nanoid, fullname}} if the login was successful
     * @returns {literal object} {success: false, message} if the login failed.
     * @param {string} email 
     * @param {string} password 
     */
    async login(email, password){
        const emailPatternVerification = this.verifyEmailPattern(email);
        if(!emailPatternVerification) return {success: false, message: "Please, write a valid email."};

        const passwordPatternVerification = this.verifyPasswordPattern(password);
        if(!passwordPatternVerification) return {success: false, message: "Please, write a valid password."};

        const verificationCredentials = await this.verifyCredentials(email, password);
        if(!verificationCredentials.success) return verificationCredentials;

        const token = await this.generateJWT({id: verificationCredentials.data.id});

        return {success: true, token, data: {nanoid: verificationCredentials.data.nanoid,
                                             fullname: verificationCredentials.data.fullname,
                                             email: verificationCredentials.data.email
                                            }};
    }

    /**
     * @desc Delete account and links from database according to param user_id.
     * @param {string} user_id 
     * @param {string} password 
     */
    async delete(user_id){
        const resultAccount = await AccountSchema.findOneAndDelete({_id: user_id})
                                    .then((data)=>{
                                        if(!data) return {success: false, message: "This user already not exist."};
                                        return {success: true};
                                    })
                                    .catch((err)=>{
                                        console.error(`\nContext: models/Account/delete\n`);
                                        console.error(`\n${err.message}\n`);
                                        process.exit(0);
                                    });

        if(!resultAccount.success) return resultAccount;

        const resultLinks = await LinkSchema.deleteMany({user_id})
                                    .then(()=>({success: true}))
                                    .catch((err)=>{
                                        console.error(`\nContext: models/Account/delete\n`);
                                        console.error(`\n${err.message}\n`);
                                        process.exit(0);
                                    });
        
        return {success: true, message: "Account and links deleted."};

    }

    /**
     * @desc Update the current password to a new password
     * @returns {literal object} {success: true} if the user was updated.
     * @param {string} id 
     * @param {string} new_password 
     */
    async updatePassword(id, new_password){

        const {password} = await this.encryptPassword(new_password);

        const result = await AccountSchema.findOneAndUpdate({_id: id}, {password})
                        .then((data)=>{
                            if(!data) return {success: false, message: "This account does not exist."};
                            return {success: true, message: "The password was updated."};
                        })
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/updatePassword\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });
        return result;        
    }

    /**
     * @desc Update the current email to a new email
     * @returns {literal object} {success: true} if the user was updated.
     * @param {string} id 
     * @param {string} new_email 
     */
    async updateEmail(id, new_email){

        const emailInDB = await this.verifyEmailInDB(new_email);

        if(emailInDB.success) return {success: false, message: "This email is already in use. Choose other."};

        const result = await AccountSchema.findOneAndUpdate({_id: id}, {email: new_email})
                        .then((data)=>{
                            if(!data) return {success: false, message: "This account does not exist."};
                            return {success: true, message: "The email was updated."};
                        })
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/updateEmail\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });
        return result;
    }

    /**
     * @desc Get information from database using the nanoid as reference.
     * @returns {literal object} {success: true, data: {fullname}} if the nanoid exists in database.
     * @returns {literal object} {success: false, message} if the nano does not exists in database.
     * @param {string} nanoid 
     */
    async getInformationByID(user_id){
        const resultAccount = await AccountSchema.findOne({_id: user_id})
                        .then((data)=>{
                            if(!data) return {success: false, message: "This account does not exist."};
                            return {success: true, data: {...data}};
                        })
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/getInformationByID\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });

        if(!resultAccount.success) return resultAccount;

        const resultLinks = await LinkSchema.find({user_id})
                        .then((data)=>data)
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/getInformationByID\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });

        const result = { fullname: resultAccount.data._doc.fullname,
                         nanoid: resultAccount.data._doc.nanoid,
                         email: resultAccount.data._doc.email,
                         genelinks: resultLinks
                        };

        return result;
    }

    /**
     * @desc Get information from database according to nanoid
     * @returns {literal object} {success: true, fullname, email, nanoid, genelinks: []} if the database
     * has links from the user with this nanoid.
     * @returns {literal object} {success: false, message} 
     * @param {string} nanoid 
     */
    async getInformationByNanoID(nanoid){
        const resultAccount = await AccountSchema.findOne({nanoid})
                        .then((data)=>{
                            if(!data) return {success: false, message: "This account does not exist."};
                            return {success: true, data: {...data}};
                        })
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/getInformationByNanoID\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });

        if(!resultAccount.success) return resultAccount;

        const user_id = resultAccount.data._doc._id;

        const resultLinks = await LinkSchema.find({user_id})
                        .then((data)=>data)
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/getInformationByNanoID\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });

        const result = {success: true, 
                        fullname: resultAccount.data._doc.fullname,
                         nanoid: resultAccount.data._doc.nanoid,
                         email: resultAccount.data._doc.email,
                         genelinks: resultLinks
                        };

        return result;


    }

    /**
     * @desc Get the nanoid according to user id.
     * @returns {literal object} {success: true, nanoid} if the user exists.
     * @returns {literal object} {success: false, message} if the user does not exist.
     * @param {string} id 
     */
    getNanoIDbyID(id){}

    /**
     * @desc Recursive method to generate a new nanoid that does not exist in database.
     * @returns {literal object} {success: true, nanoid} when the new nanoid is complete.
     */
    async generateNanoID(){
        const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVXWYZ123456789", 10);
        const nanoid_code = nanoid();
        const verificationNanoIDinDB = await this.verifyNanoIDinDB(nanoid_code);
        if(verificationNanoIDinDB.success) await this.generateNanoID();
        return {success: true, nanoid: nanoid_code};
    }

    /**
     * @desc Generate a new token with the payload
     * @returns {literal object} {...token} if the token was generated.
     * @param {literal object} payload 
     */
    async generateJWT(payload){
        const token = await jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`);
        return token;
    }

    /**
     * @desc Encypt the password
     * @returns {literal object} {success: true, password} if the password was encrypted with success
     * @param {string} password 
     */
    async encryptPassword(password){
        const salt = await bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SECRET_KEY));
        const hash = await bcrypt.hashSync(password, `${salt}`);
        return {success: true, password: hash};
    }

    /**
     * @desc Verify if the nanoid is in use on database
     * @returns {literal object} {success: true} if the nanoid is in database.
     * @returns process.exit(0) if some error is catched.
     * @param {string} nanoid 
     */
    async verifyNanoIDinDB(nanoid){
        const result = await AccountSchema.findOne({nanoid})
        .then((data)=>{
            if(data) return {success: true};
            return {success: false};
        })
        .catch((err)=>{
            console.error(`\nContext: models/Account/verifyNanoIDinDB\n`);
            console.error(`\n${err.message}\n`);
            process.exit(0);
        });

        return result;
    }

    /**
     * @desc Verify if the email is according to the pattern (regex)
     * @returns {boolean}
     * @param {string} email 
     */
    verifyEmailPattern(email){
        const email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const result = email_regexp.test(email);
        return result;
    }

    /**
     * @desc Verify if the password is according to the pattern (regex)
     * @returns {boolean}
     * @param {string} password 
     */
    verifyPasswordPattern(password){
        const password_regexp = /^([a-zA-Z0-9@*#]{8,15})$/;
        const result = password_regexp.test(password);
        return result;
    }

    /**
     * @desc Verify if the email is in use on database.
     * @returns {literal object} {success: true, data: {id, fullname, nanoid}} if the email exists in database.
     * @param {string} email 
     */
    async verifyEmailInDB(email){
        const result = await AccountSchema.findOne({email})
                        .then((data)=>{
                            if(data) return {success: true, data: {id: data.id, fullname: data.fullname, nanoid: data.nanoid}};
                            return {success: false}
                        })
                        .catch((err)=>{
                            console.error(`\nContext: models/Account/verifyNanoIDinDB\n`);
                            console.error(`\n${err.message}\n`);
                            process.exit(0);
                        });
        return result;
    }

    /**
     * @desc Verify if one user with these email and password exists.
     * @returns {literal object} {success: true, data: {id, fullname, nanoid}}
     * @param {string} email 
     * @param {string} password 
     */
    async verifyCredentials(email, password){
        const result = await AccountSchema.findOne({email})
        .then(async (data)=>{
            if(!data) return {success: false, message: "This user does not exist."};

            const verificationHash = await bcrypt.compareSync(password, data.password);
            if(!verificationHash) return {success: false, message: "This password is wrong."};

            return {success: true, message: "This credentials are correct.",
                    data: {id: data._id,fullname: data.fullname, nanoid: data.nanoid, email: data.email}};
        })
        .catch((err)=>{
            console.error(`\nContext: models/Account/verifyCredentials\n`);
            console.error(`\n${err.message}\n`);
            process.exit(0);
        });

        return result;
    }

}

module.exports = Account;