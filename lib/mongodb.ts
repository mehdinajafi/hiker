import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const mongoPromise = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
mongoPromise.connect();
export default mongoPromise;
