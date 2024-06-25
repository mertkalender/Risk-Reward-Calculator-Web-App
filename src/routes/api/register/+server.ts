import { MongoClient } from 'mongodb';
import { DB_NAME, DB_USERS_COLLECTION } from '../../../constants/database.ts';
import { VITE_DB_URI } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// this function should create a new user with email and password values

	const { email, password } = await request.json();

	const client = new MongoClient(VITE_DB_URI);

	try {
		await client.connect();
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_USERS_COLLECTION);

		const newUser = { email, password };
		const result = await collection.insertOne(newUser);
		return new Response(JSON.stringify(result), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	} finally {
		await client.close();
	}
}
