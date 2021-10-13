<template>
  <template v-for="swatch in swatches" :key="swatch">
    <div
      class="swatch"
      :style="{ backgroundColor: swatch }"
      @click="selectSwatch(swatch)"
    ></div>
  </template>
</template>

<script>
export default {
  emits: ["selectColor"],

  data() {
    return {
      color: "#f94144",
      swatches: [
        "#fff",
        "#000",
        "#cbd5e0",
        "#718096",
        "#fc8181",
        "#e53e3e",
        "#9b2c2c",
        "#f6ad55",
        "#dd6b20",
        "#9c4221",
        "#f6e05e",
        "#d69e2e",
        "#975a16",
        "#68d391",
        "#38a169",
        "#276749",
        "#4fd1c5",
        "#319795",
        "#285e61",
        "#63b3ed",
        "#3182ce",
        "#7f9cf5",
        "#5a67d8",
        "#434190",
        "#b794f4",
        "#805ad5",
        "#553c9a",
        "#f687b3",
        "#d53f8c",
        "#97266d",
      ],
    };
  },

  methods: {
    selectSwatch(color) {
      this.$emit("selectColor", color);
    },
  },
};
</script>