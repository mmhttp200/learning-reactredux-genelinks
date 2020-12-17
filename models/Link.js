/**
 * Link.js
 */

const LinkSchema = require('../schemas/Link');
const LinkTypeSchema = require('../schemas/LinkType');

class Link{
    constructor(){}

    /**
     * @desc Create a new link according to link_id
     * @returns {literal object} {success: true, data: {type, type}} was created.
     * @param {string} user_id 
     * @param {string} type 
     * @param {string} uri 
     */
    async create(user_id, type, uri){

        const result_regex = this.verifyPattern(type, uri);
        if(!result_regex) return {success: false, message: "This URI is not according our patterns."};

        const newLink = new LinkSchema({user_id, type, uri});
        const result = await newLink.save()
                                .then(()=>({success: true, message: "The link was created."}))
                                .catch((err)=>{
                                    console.error(`\nContext: models/Link/create\n`);
                                    console.error(`\n${err.message}\n`);
                                    return {success: false, message: "The link was not created. Iternal error."};
                                });
        return result;
    }

    /**
     * @desc Delete the link according to user_id and link_id
     * @returns {literal object} {success: true} if the link was deleted.
     * @param {string} user_id 
     * @param {string} token 
     */
    async delete(user_id, link_id){
        const result = await LinkSchema.deleteOne({_id: link_id, user_id})
                                .then((data)=>({success: true, message: "The link was deleted."}))
                                .catch((err)=>{
                                    console.error(`\nContext: models/Link/create\n`);
                                    console.error(`\n${err.message}\n`);
                                    process.exit(0);
                                })
        return result;
    }

    async getLinkTypes(){
        const result = await LinkTypeSchema.find().then(data=>data)
        .catch((err)=>{
            console.error(`\nContext: models/Link/create\n`);
            console.error(`\n${err.message}\n`);
            process.exit(0);
        });
        
        return {success: true, data: result};

    }

    /**
     * 
     * @param {string} type 
     * @param {string} uri 
     */
    verifyPattern(type, uri){
        const genera_regex = /^https:\/\/exames.genera.com.br\/[a-zA-Z?=0-9&]+$/;
        const gedmatch_regex = /^[A-Z]{0,2}[0-9]+$/;

        switch(type){
            case "Genera":
                return genera_regex.test(uri);
            case "Gedmatch":
                return gedmatch_regex.test(uri);
            default:
                return false;
        }

    }

}

module.exports = Link;