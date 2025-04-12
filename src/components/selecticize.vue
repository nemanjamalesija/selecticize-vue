<template>
	<div
		:class="['SelectTarget', `SelectTarget-target--${index}`, { focusedTarget: isActiveInput }]"
		@click="handleFocus"
	>
		<div :class="['SelectTarget-chosen', `SelectTarget-target--${index}`]" @click="handleFocus">
			<div
				v-for="(input, _) in selectedInputsSorted"
				:key="input.id"
				:class="['SelectTarget-selectedChoice', `SelectTarget-target--${index}`]"
			>
				<span :class="`SelectTarget-target--${index}`">{{ input.title }}</span>
				<button
					type="button"
					class="btn btn--closeSelectedChoice remove"
					:class="`SelectTarget-target--${index}`"
					@click="removeChosenInput(input)"
				>
					x
				</button>
			</div>

			<input
				ref="inputRef"
				v-model="text"
				type="text"
				style="width: auto"
				:class="['SelectTarget-input', `SelectTarget-target--${index}`]"
				:placeholder="computedPlaceholder"
				@keydown="handleKeys"
				@input="handleInput"
			/>
			<span
				ref="spanRef"
				style="visibility: hidden; position: absolute; white-space: pre"
			></span>
		</div>

		<ul ref="choicesref" :class="['SelectTarget-choices', `SelectTarget-target--${index}`]">
			<li
				v-for="(input, _) in avaliableInputsSorted"
				:key="input.id"
				:class="['SelectTarget-choice', 'hoverclass', `SelectTarget-target--${index}`]"
				:data-id="input.id"
				:data-title="input.title"
				:data-value="input.value"
				@pointerenter="handleHover"
				@click="handleChooseInput(input, input.id)"
			>
				{{ input.title }}
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		sources: {
			type: Array,
			required: true,
			default: () => []
		},
		index: {
			type: Number,
			required: true
		},

		placeholder: {
			type: String,
			required: true
		},

		maxInputs: {
			type: Number,
			default: Infinity
		},

		payloadKey: {
			type: String,
			required: true
		},

		populatedValues: {
			type: [Array, String, Number],
			default: () => []
		}
	},

	data() {
		return {
			activeIndex: null,
			isSelecting: false,
			avaliableInputs: this.sources,
			selectedInputs: [] /** TODO:  accept default number of accepted items  */,
			handleDocumentClick: null,
			text: '',

			arrowSelectionIndex: 0,
			highlitedChoice: null
		};
	},
	computed: {
		isActiveInput() {
			return this.activeIndex === this.index;
		},

		/** TODO: process keys to accept any array of choices */
		avaliableInputsSorted() {
			if (this.avaliableInputs.length > 0) {
				return this.avaliableInputs.sort((a, b) => a.title.localeCompare(b.title));
			}
			return [];
		},

		/** TODO: process keys to accept any array of choices */
		selectedInputsSorted() {
			if (this.selectedInputs.length > 0) {
				return this.selectedInputs.sort((a, b) => a.title.localeCompare(b.title));
			}

			return [];
		},

		computedPlaceholder() {
			return this.selectedInputs.length <= 0 && !this.isActiveInput ? this.placeholder : '';
		}
	},

	mounted() {
		this.handleDocumentClick = (e) => {
			if (!e.target.classList.contains(`SelectTarget-target--${this.activeIndex}`)) {
				this.activeIndex = null;
			}
		};

		document.addEventListener('click', this.handleDocumentClick);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.handleDocumentClick);
	},
	methods: {
		setActiveInput(index) {
			this.activeNuput = index;
		},

		handleChooseInput(input, itemId) {
			if (this.selectedInputs.length >= this.maxInputs) return;

			this.avaliableInputs = this.avaliableInputs.filter((i) => i.id != input.id);
			this.selectedInputs.push(input);
			this.text = '';

			/** TODO: propagate event up*/
		},

		handleFocus() {
			this.activeIndex = this.index;
			this.$refs.inputRef.focus();
		},

		handleInput() {
			const inputElement = this.$refs.inputRef;
			const spanElement = this.$refs.spanRef;

			spanElement.textContent = this.text;

			if (!this.text) spanElement.textContent = this.placeholder;

			const textWidth = spanElement.offsetWidth;

			inputElement.style.width = `${textWidth + 4}px`;

			const sources = this.sources;
			const text = this.text.toLowerCase();
			const selectedInputIds = new Set(this.selectedInputs.map((item) => item.id));

			const filteredInputs = sources.filter((input) => {
				const matchesText = input.title.toLowerCase().includes(text);

				const notSelected = !selectedInputIds.has(input.id);

				return matchesText && notSelected;
			});

			this.avaliableInputs = this.compareSelectedAndAvaliableInputs();
		},

		handleKeys(e) {
			if (e.key === 'ArrowDown') {
				this.handleArrowKey('down');
			} else if (e.key === 'ArrowUp') {
				this.handleArrowKey('up');
			}

			if (e.key === 'Enter') {
				this.handleEnterKey();
			}

			if (e.key === 'Backspace') {
				if (this.selectedInputs.length > 0 && !this.text) {
					const lastInput = this.selectedInputs.pop();

					this.avaliableInputs.push(lastInput);
				}
			}
		},

		removeChosenInput(input) {
			this.selectedInputs = this.selectedInputs.filter((i) => i.id !== input.id);

			if (this.payloadKey === 'variables') {
				this.removeVariableFromPayload(input.id);
			} else this.$emit('buildPayloadForStore', this.payloadKey, '');

			if (this.avaliableInputs.length <= 0 && this.selectedInputs.length >= 0) {
				this.avaliableInputs = this.compareSelectedAndAvaliableInputs();
			} else this.avaliableInputs.push(input);
		},

		handleHover(e) {
			const choicesChildren = this.$refs.choicesref.querySelectorAll('li');

			choicesChildren.forEach((child) => {
				child.classList.remove('SelectTarget-choice--highlited');
				child.classList.add('SelectTarget-choice--hoverClass');
			});
		},

		handleArrowKey(direction) {
			if (this.avaliableInputs.length <= 0) return;

			const choicesChildren = this.$refs.choicesref.querySelectorAll('li');

			if (direction === 'down') {
				this.arrowSelectionIndex++;
			} else if (direction === 'up') {
				this.arrowSelectionIndex--;
			}

			if (this.arrowSelectionIndex > choicesChildren.length) {
				this.arrowSelectionIndex = 1;
			} else if (this.arrowSelectionIndex < 1) {
				this.arrowSelectionIndex = choicesChildren.length;
			}

			choicesChildren.forEach((child) => {
				child.classList.remove('SelectTarget-choice--hoverClass');
				child.classList.remove('SelectTarget-choice--highlited');
			});

			const currentChoice = choicesChildren[this.arrowSelectionIndex - 1];
			currentChoice.classList.add('SelectTarget-choice--highlited');

			this.highlitedChoice = {
				id: currentChoice.getAttribute('data-id'),
				title: currentChoice.getAttribute('data-title')
			};
		},

		handleEnterKey() {
			if (this.selectedInputs.length >= this.maxInputs) return;

			if (this.highlitedChoice) {
				this.selectedInputs.push(this.highlitedChoice);

				this.avaliableInputs = this.avaliableInputs.filter(
					(i) => i.id != this.highlitedChoice.id
				);

				/** TODO: propagate event up*/

				this.highlitedChoice = null;
			}
		},

		compareSelectedAndAvaliableInputs() {
			const sources = this.sources;
			const text = this.text.toLowerCase();
			const selectedInputIds = new Set(this.selectedInputs.map((item) => item.id));

			const filteredInputs = sources.filter((input) => {
				const matchesText = input.title.toLowerCase().includes(text);

				const notSelected = !selectedInputIds.has(input.id);

				return matchesText && notSelected;
			});

			return filteredInputs;
		}
	}

	/** TODO: define emit for propagatin up*/
});
</script>
