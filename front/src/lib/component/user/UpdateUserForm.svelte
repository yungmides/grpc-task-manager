<script lang="ts">
	import FormError from '../FormError.svelte';
	import { enhance } from '$app/forms';
	import modal from '$src/stores/modal';
	import { username } from '$src/stores/user';
	import type { PageData } from '../../../routes/$types';

	let error = '';

	export let data: PageData;
	$: user = data.user;
	const test = JSON.stringify(username);
</script>

{test}
<form
	method="post"
	action="/user?update"
	use:enhance={({ data, form }) => {
		data.append('firstName', user.firstName);
		data.append('lastName', user.lastName);
		data.set('userId', user.id);

		return ({ result }) => {
			if (result.type === 'success') {
				form.reset();
				modal.close();
			}
			error = result.data?.error;
		};
	}}
>
	<FormError {error} />
	<div class="form-control">
		<label class="input-group input-group-sm my-2">
			<span class="w-24 p-2">First name</span>
			<input type="text" class="input input-bordered" name="firstName" required />
		</label>
		<label class="input-group input-group-sm my-2">
			<span class="w-24 p-2">Last name</span>
			<input type="text" class="input input-bordered" name="lastName" required />
		</label>
	</div>
	<button class="btn btn-info">Update User</button>
</form>
