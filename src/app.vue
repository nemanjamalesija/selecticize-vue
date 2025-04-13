<template>
	<div class="cnt">
		<Selecticize
			:sources="sources"
			:maxInputs="4"
			:index="1"
			placeholder="Some placeholder text..."
			payloadKey="kind"
		/>
	</div>
</template>
<script lang="ts">
import Selecticize from './components/selecticize.vue';

export default {
	components: { Selecticize },

	computed: {
		sources() {
			return [
				{ id: 'consumption', title: 'Graf potrošnje' },
				{ id: 'correlation', title: 'Korelacija' },
				{ id: 'regression', title: 'Regresivna Analiza' },
				{ id: 'next-1', title: 'Masna Konstrakta' },
				{ id: 'next-2', title: 'Marsupulami Slajs' },
				{ id: 'next-3', title: 'La vida es un carousel' },
				{ id: 'next-4', title: 'Tengo mi novia' }
			];
		}
	}
};
</script>
