import { MongoClient } from "mongodb";

const {
    CONNECTION_STRING = "mongodb://localhost:27017",
    DB = "deped-ncr-rehauling"
} = process.env;

export default class Database {
    constructor() {
        this.mongoClient = null;
        this.db = null;
    }

    static connect() {
        return MongoClient.connect(CONNECTION_STRING)
            .then(mongoClient => {
                this.mongoClient = mongoClient;
                this.db = mongoClient.db(DB);
                return "Successfully connected to mongodb."
            })
            .catch(() => {
                throw new Error('Failed to connect to mongodb.')
            })
    }

    static instance() {
        return this.db;
    }

    static client() {
        return this.mongoClient;
    }
}