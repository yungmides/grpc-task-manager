import { browser } from '$app/environment';
import type { User } from '$src/lib/stubs/user/v1alpha/message';
import { writable } from 'svelte/store';

const createUsernameStore = () => {
	const username = writable('');

	if (browser) {
		username.set(localStorage.getItem('username') || '');
	}

	return {
		...username,
		set: (name: string) => {
			if (browser) {
				localStorage.setItem('username', name);
			}
			username.set(name);
		}
	};
};

const createUserStore = () => {
	const storedUser = writable({} as User);

	if (browser) {
		storedUser.set(JSON.parse(localStorage.getItem('user') || '{}'));
	}

	return {
		...storedUser,
		set: (user: User) => {
			if (browser) {
				localStorage.setItem('user', JSON.stringify(user));
			}
			storedUser.set(user);
		}
	};
};

export const username = createUsernameStore();
export const storedUser = createUserStore();
export const muteToast = writable(false);
