<template>
	<div class="cnt">
		<Selecticize
			:sources="sources"
			:maxInputs="4"
			:index="1"
			placeholder="bla"
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
				{ id: 'regression', title: 'Regresivna Analiza' }
			];
		}
	}
};
</script>
