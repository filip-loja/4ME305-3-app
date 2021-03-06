<template>
	<div style="display: block; width: 100%; height: 50px;"></div>
	<ion-footer class="fl-footer">
		<div class="fl-footer__inner">
			<slot />
		</div>
	</ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter } from '@ionic/vue'

export default defineComponent({
	name: 'FlButtonsBottom',
	components: { IonFooter },
})
</script>

<style>

	.fl-footer {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.fl-footer__inner {
		display: flex;
		width: 100%;
		height: 50px;
		background-color: white;
	}

	.fl-footer__inner ion-button {
		margin: 0;
		flex: 1 1 10px;
		height: 100%;
		--border-radius: 0;
	}

</style>
