<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
      Care Buddy
    </a>
<!-- Formularz rejestracji -->
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">

				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
          Utwórz nowe konto
        </h1>

        <Form @submit="submitForm" keep-values
							class="space-y-4 md:space-y-6" v-slot="{ handleSubmit, values }" >

					<template v-if="step === 1">

						<div class="mb-4">
							<label for="email"
										 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
								Twój adres e-mail
							</label>
							<Field type="email" name="email" id="email" placeholder="twójadres@email.com"
										 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg
										 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
										 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
										 dark:focus:border-blue-500" required>
							</Field>
							<ErrorMessage name="email" class="error-feedback" />
						</div>

						<div class="mb-4">
							<label for="password"
										 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
								Hasło
							</label>
							<Field type="password" name="password" id="password" placeholder="••••••••"
										 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg
										 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
										 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
										 dark:focus:border-blue-500" required>
							</Field>
							<ErrorMessage name="password" class="error-feedback" />
						</div>

						<div class="mb-4">
							<label for="confirm-password"
										 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
								Potwierdź hasło
							</label>
							<Field type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
										 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg
										 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
										 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
										 dark:focus:border-blue-500" required>
							</Field>
							<ErrorMessage name="confirm-Password" class="error-feedback" />
						</div>

						<p class="text-xl font-light text-white- dark:text-white">
							Posiadasz już konto?
							<a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
								<router-link to="/login">Zaloguj się</router-link>
							</a>
						</p>

					</template>

					<template v-if="step === 2">

						<div class="mb-4">
							<label for="image_url"
										 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
								Adres URL obrazu
							</label>
							<Field type="text" name="image_url" id="image_url" placeholder="https://example.com/image.jpg"
										 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg
										 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
										 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
										 dark:focus:border-blue-500" required>
							</Field>
							<ErrorMessage name="image_url" class="error-feedback" />
						</div>

						<div class="mb-4">
							<label for="role"
										 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
								Rola użytkownika
							</label>
							<Field as="select" name="role" id="role"
										 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg
										 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
										 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
										 dark:focus:border-blue-500" required>
								<option value="" disabled selected>Wybierz rolę</option>
								<option value="caregiver">Opiekun</option>
								<option value="elderly">Podopieczny</option>
							</Field>
							<ErrorMessage name="role" class="error-feedback" />
						</div>

						<div class="flex items-start">
							<div class="flex items-center h-5">
								<input id="terms" aria-describedby="terms" type="checkbox"
											 class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300
											 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600
											 dark:ring-offset-gray-800" required>
							</div>

							<div class="ml-3 text-sm">
								<label for="terms" class="font-light text-gray-500 dark:text-gray-300">
									Akceptuję
									<a class="font-medium text-primary-600 hover:underline
											dark:text-primary-500" href="#">
										Politykę prywatności
									</a>
								</label>
							</div>

						</div>

					</template>

					<button v-if="step === 2" type="button" @click="prevStep">Wróć</button>

					<button type="submit" :disabled="loading"
									class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none
											focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600
											dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="loading">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0
												22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144
												73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921
												72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871
												24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754
												1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813
												4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191
												9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347
												21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421
												39.6781 93.9676 39.0409Z"
										fill="currentFill"/>
						</svg>
						<span class="sr-only" v-show="loading">Loading...</span>
						{{ (step === 1) ? 'Dalej' : 'Zarejestruj' }}
					</button>

					<pre>{{ values }}</pre>

        </Form>

				<div v-if="message" :class="successful ? 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 ' +
				 		'dark:bg-gray-800 dark:text-green-400' : 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ' +
				  	'dark:bg-gray-800 dark:text-red-400'" role="alert"
						 class="text-center text-lg font-medium text-green-600 dark:text-green-400">
					{{ message }}
				</div>

      </div>

    </div>

  </div>
</template>


<script lang="ts">
import {Form, ErrorMessage, Field, FormContext, SubmissionHandler} from "vee-validate";
import * as yup from 'yup';
import {useAuthStore} from "@/stores/auth.module";
import BaseCard from "@/components/UI/BaseCard.vue";

const authStore = useAuthStore();

export default {
	name: 'RegisterComponent',
	components: {
		BaseCard,
		Field,
		Form,
		ErrorMessage
	},
	data() {
		const schemas = [
			yup.object().shape({
				email: yup
						.string()
						.email('Adres e-mail jest niewłaściwy!')
						.required('Adres e-mail jest wymagany!')
						.max(99, 'Adres e-mail jest zbyt długi!'),
				password: yup
						.string()
						.required('Hasło jest wymagane!')
						.min(8, 'Hasło musi mieć co najmniej 8 znaków!')
						.max(99, 'Hasło jest zbyt długie!'),
				confirmPassword: yup
						.string()
						.required()
						.test('passwords-match', 'Hasła muszą się zgadzać!', function (value) {
							return this.parent.password === value
						}),
			}),
			yup.object().shape({
				image_url: yup
						.string()
						.required()
						.url('Podaj adres URL obrazu.')
						.max(2063, 'Adres URL jest zbyt długi!'),
				role: yup
						.string()
						.oneOf(['caregiver', 'elderly'])
						.required('Wybierz rolę użytkownika.'),
			})
		];

		return {
			successful: false,
			loading: false,
			message: '',
			step: 1,
			schemas,
		};
	},
	computed: {
		loggedIn() {
			return authStore.status.loggedIn;
		},
		currentSchema() {
			return this.schemas[Symbol.iterator]().next().value;
		}
	},
	mounted() {
		if (this.loggedIn) {
			this.$router.push('/profil');
		}
	},
	methods: {
		prevStep() {
			this.step = 1;
		},
		submitForm(formContext: any) {
			console.log('submitForm called' + formContext.values);
			if (this.step === 1) {
				this.step++;
			} else if (this.step === 2) {
				const {confirmPassword, ...user} = formContext.values;
				this.handleRegister(user);
			} else {
				formContext.resetForm();
				this.step = 1;
			}
		},
		handleRegister(user: any) {
			console.log(user);
			this.message = '';
			this.loading = true;
			this.successful = false;

			authStore.register(user)
					.then(() => {
						this.message = 'Konto zostało utworzone pomyślnie!';
						this.loading = false;
						this.successful = true;
						this.step = 1;
					})
					.catch((error: any) => {
						console.log(error);
						this.message = error.toString();
						this.loading = false;
						this.successful = false;
						this.step = 1;
					});
		}
	}
}
</script>