import { MongoClient, type Document, type WithId } from 'mongodb';
import { DB_NAME, DB_USERS_COLLECTION } from '../../../constants/database.ts';
import { VITE_DB_URI } from '$env/static/private';

// write a get type request for returning true if the user email and password are correct and false if they are not

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// this function should return true if the user email and password are correct and false if they are not
	
	const { email, password } = await request.json();

	const client = new MongoClient(VITE_DB_URI);

	try {
		await client.connect();
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_USERS_COLLECTION);

		const user = await collection.findOne({ email, password });
		if (user) {
			return new Response(JSON.stringify(true), { status: 200 });
		} else {
			return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
		}
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	} finally {
		await client.close();
	}
}