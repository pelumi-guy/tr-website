import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

var configPath = path.resolve('.', 'config.env');
// console.log(`configPath: ${configPath}`);

dotenv.config({ path: configPath });


// const connectDB = (url) => {
//     mongoose.set('strictQuery', true);

//     mongoose.connect(url)
//         .then(() => console.log('MongoDB connected'))
//         .catch((error) => console.log(error));
// }

// export default connectDB;


const uri = process.env.MONGODB_CLUSTER_URI;


const connectDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, ).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch((err) => console.log(`Unable to connect to database... Due to ${err}`));
};


// const client = new MongoClient(process.env.DB_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });


const connectAtlas = async() => {
    client.connect()
        .then(() => console.log("Server connected with remote database"))
        .catch(() => console.log("Unable to connect to database..."));
}

export {
    connectDatabase,
    connectAtlas
}