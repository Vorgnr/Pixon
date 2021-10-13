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
    <button
      class="bg-blue-500 toolbox-btn"
      @click="addRow"
    >
      +
    </button>
    {{ size }} x {{ size }}
    <button
      class="bg-blue-500 toolbox-btn"
      @click="delRow"
    >
      -
    </button>
    <button
      class="bg-red-600 toolbox-btn"
      @click="del"
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
    <button
      class="bg-green-400 toolbox-btn"
      @click="$emit('save')"
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
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
        />
      </svg>
    </button>
    <button
      class="bg-green-400 toolbox-btn"
      @click="$emit('load')"
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
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'pen',
    },
    size: {
      type: Number,
      default: 64
    }
  },
  emits: ['addRow', 'delRow', 'changeMode', 'del', 'save', 'load'],

  methods: {
    addRow() {
      this.$emit('addRow');
    },
    delRow() {
      this.$emit('delRow');
    },
    del() {
      this.$emit('del');
    },
    changeMode(mode) {
      if (this.mode !== mode) {
        this.$emit('changeMode', mode);
      }
    },
  },
};
</script>
