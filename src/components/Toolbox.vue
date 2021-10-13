<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      :class="mode === 'pen' ? 'bg-green-700' : 'hover:bg-green-600'"
      class="bg-green-500 toolbox-btn"
      @click="changeMode('pen')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
    <button
      :class="mode === 'rubber' ? 'bg-red-700' : 'hover:bg-red-600'"
      class="bg-red-500 toolbox-btn"
      @click="changeMode('rubber')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button @click="addRow" class="bg-blue-500 toolbox-btn">+</button>
    <button @click="delRow" class="bg-blue-500 toolbox-btn">-</button>
  </div>
</template>

<script>
export default {
  emits: ['addRow', 'delRow', 'changeMode'],
  props: {
    mode: {
      type: String,
      default: "pen",
    },
  },

  methods: {
    addRow() {
      this.$emit("addRow");
    },
    delRow() {
      this.$emit("delRow");
    },
    changeMode(mode) {
      if (this.mode !== mode) {
        this.$emit("changeMode", mode);
      }
    },
  },
};
</script>
