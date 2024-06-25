<script>
	import { goto } from '$app/navigation';
	import Loader from '../../components/Loader.svelte';

	let email = '';
	let password = '';
	let isLoading = false;

	async function handleSubmit() {
		isLoading = true;
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		isLoading = false;
		if (res.ok) {
			goto('/login');
		} else {
			alert('Register Failed');
		}
	}

	function navigateToLogin() {
		goto('/login');
	}
</script>

<main>
	<h1>Register</h1>

	{#if isLoading}
		<Loader text={'Signing you up...'} />
	{/if}

	<form on:submit={handleSubmit}>
		<label for="email">Email:</label>
		<input type="email" id="email" bind:value={email} required />

		<label for="password">Password:</label>
		<input type="password" id="password" bind:value={password} required />

		<button type="submit">Register</button>
	</form>

	<p>
		Already have an account? <button class={'login'} on:click={navigateToLogin}>Login</button>
	</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
		font-family: Arial, sans-serif;
	}

	h1 {
		margin-bottom: 1rem;
		color: var(--color-theme-1);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
        width: 300px;
	}

	label {
		font-weight: bold;
	}

	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--color-theme-2);
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

    .login {
		background-color: var(--color-theme-1);
	}
</style>
