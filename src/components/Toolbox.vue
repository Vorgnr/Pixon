<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row ">
      <div class="mr-4 border-2 border-gray-200 rounded-md">
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: mode === 'pen' }"
          @click="changeMode('pen')"
        >
          <font-awesome-icon icon="pen" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: mode === 'rubber' }"
          @click="changeMode('rubber')"
        >
          <font-awesome-icon icon="eraser" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: mode === 'fill' }"
          @click="changeMode('fill')"
        >
          <font-awesome-icon icon="fill" />
        </button>
      </div>

      <div class="mr-4 border-2 border-gray-200 rounded-md">
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: form === 'square' }"
          @click="changeForm('square')"
        >
          <font-awesome-icon :icon="['fas', 'square-full']" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: form === 'square-rounded' }"
          @click="changeForm('square-rounded')"
        >
          <font-awesome-icon :icon="['fas', 'square']" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: form === 'square-empty-rounded' }"
          @click="changeForm('square-empty-rounded')"
        >
          <font-awesome-icon :icon="['far', 'square']" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: form === 'circle' }"
          @click="changeForm('circle')"
        >
          <font-awesome-icon icon="circle" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: form === 'circle-empty' }"
          @click="changeForm('circle-empty')"
        >
          <font-awesome-icon icon="dot-circle" />
        </button>
      </div>
      <div class="mr-4 border-2 border-gray-200 rounded-md">
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: gridMode === 'grid' }"
          @click="changeGridMode('grid')"
        >
          <font-awesome-icon icon="border-all" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: gridMode === 'none' }"
          @click="changeGridMode('none')"
        >
          <font-awesome-icon icon="border-none" />
        </button>
        <button
          class="toolbox-btn hover:bg-indigo-600"
          :class="{ active: gridMode === 'dot' }"
          @click="changeGridMode('dot')"
        >
          <font-awesome-icon icon="ellipsis-v" />
        </button>
      </div>
    </div>
    <div class="flex flex-row items-center">
      <div class="mr-4 border-2 border-gray-200 rounded-md">
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
          :class="{ disabled: !canUndo, active: canUndo }"
          @click="canUndo && $emit('undo')"
        >
          <font-awesome-icon icon="undo" />
        </button>
        <button
          class="toolbox-btn"
          :class="{ disabled: !canRedo, active: canRedo }"
          @click="canRedo && $emit('redo')"
        >
          <font-awesome-icon icon="redo" />
        </button>
      </div>
      <div class="">
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
      </div>
    </div>
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
    gridMode: {
      type: String,
      default: 'grid',
    },
    size: {
      type: Number,
      default: 64,
    },
    canUndo: {
      type: Boolean,
      default: false,
    },
    canRedo: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'addRow',
    'delRow',
    'changeMode',
    'changeForm',
    'changeGridMode',
    'del',
    'save',
    'load',
    'undo',
    'redo',
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
    },

    changeGridMode(gridMode) {
      if (this.gridMode !== gridMode) {
        this.$emit('changeGridMode', gridMode);
      }
    },
  },
};
</script>
