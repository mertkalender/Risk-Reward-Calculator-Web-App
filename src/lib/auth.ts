// src/lib/auth.js

import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

export async function login() {
	isAuthenticated.set(true);
}

export async function logout() {
	isAuthenticated.set(false); // Update authentication state
}
