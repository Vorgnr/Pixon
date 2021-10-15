<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      class="toolbox-btn hover:bg-indigo-600"
      :class="{'bg-indigo-600': mode === 'pen'}"
      @click="changeMode('pen')"
    >
      <font-awesome-icon
        icon="pen"
      />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      :class="{'bg-indigo-600': mode === 'rubber'}"
      @click="changeMode('rubber')"
    >
      <font-awesome-icon icon="eraser" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      :class="{'bg-indigo-600': mode === 'fill'}"
      @click="changeMode('fill')"
    >
      <font-awesome-icon icon="fill" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      @click="$emit('addRow')"
    >
      <font-awesome-icon icon="plus-circle" />
    </button>
    <span class="toolbox-text">{{ size }} x {{ size }}</span>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      @click="$emit('delRow')"
    >
      <font-awesome-icon icon="minus-circle" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      @click="$emit('del')"
    >
      <font-awesome-icon icon="trash-alt" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      @click="$emit('save')"
    >
      <font-awesome-icon icon="save" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      @click="$emit('load')"
    >
      <font-awesome-icon icon="folder-open" />
    </button>
    <button
      class="toolbox-btn"
      :class="{ 'disabled' : !canUndo, 'hover:bg-indigo-600': canUndo }"
      @click=" canUndo && $emit('undo')"
    >
      <font-awesome-icon icon="undo" />
    </button>
    <button
      class="toolbox-btn"
      :class="{ 'disabled' : !canRedo, 'hover:bg-indigo-600': canRedo }"
      @click="canRedo && $emit('redo')"
    >
      <font-awesome-icon icon="redo" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      :class="{'bg-indigo-600': form === 'square'}"
      @click="changeForm('square')"
    >
      <font-awesome-icon icon="square" />
    </button>
    <button
      class="toolbox-btn hover:bg-indigo-600"
      :class="{'bg-indigo-600': form === 'circle'}"
      @click="changeForm('circle')"
    >
      <font-awesome-icon icon="dot-circle" />
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
    form: {
      type: String,
      default: 'square',
    },
    size: {
      type: Number,
      default: 64
    },
    canUndo: {
      type: Boolean,
      default: false,
    },
    canRedo: {
      type: Boolean,
      default: false,
    }
  },

  emits: [
    'addRow', 'delRow', 'changeMode', 'changeForm',
    'del', 'save', 'load', 'undo', 'redo'
  ],

  methods: {
    changeMode(mode) {
      if (this.mode !== mode) {
        this.$emit('changeMode', mode);
      }
    },

    changeForm(form) {
      if (this.form !== form) {
        this.$emit('changeForm', form);
      }
    }
  },
};
</script>
