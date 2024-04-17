<template>
	<div class="form">
		<div class="form-container">
			<h2 class="form-header">
				Войти
			</h2>
			<InputText placeholder="Email" class="form-input" />
			<Password placeholder="Password" class="form-input" />
			<Button class="form-button" label="Войти" />
			<Button link class="form-reset-password" label="Забыли пароль?" />
			<div class="form-toggle-sign">
				<span>Еще нет аккаунта?</span>
				<Button link class="form-toggle-sign-btn" label="Зарегистрироваться" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.form {
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form-container {
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
}

.form-header {
	font-weight: normal;
	font-size: 24px;
}

.form-input {
	width: 100%;
}

.p-password {
	flex-direction: column-reverse;
}

.form-reset-password {
	padding: 0;
	align-self: flex-start;
	font-size: 14px;
}

.form-toggle-sign {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 5px;
}

.form-toggle-sign-btn {
	padding: 0;
}
</style>
