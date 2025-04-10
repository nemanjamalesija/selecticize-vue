<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Selecticize from './components/selecticize.vue'
import { ref } from 'vue'

const sources = [
        { id: "consumption", title: "Graf potrošnje" },
        { id: "correlation", title: "Korelacija" },
        { id: "regression", title: "Regresivna Analiza" },
      ];

const ss = ref(sources)
</script>

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

