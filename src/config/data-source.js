import "reflect-metadata";
import { DataSource } from "typeorm";
const User = require('../models/UserEntity');

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "laptop-store-project",
    url: "mongodb://localhost:27017",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User],
});