<template>
  <div class="chart-container">
    <canvas :id="id"></canvas>
    <div class="chart-text">
      <slot name="hollow-text"></slot>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Chart",

  props: {
    type: {
      type: String,
      default: "",
    },
    dataLabel: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  mounted() {
    this.renderCanvas();
  },

  computed: {
    chartData() {
      return this.data;
    },
    id() {
      return uuidv4();
    },
  },

  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderCanvas();
      },
    },
  },

  data() {
    return {
      canvas: null,
    };
  },

  methods: {
    renderCanvas() {
      const ctx = document.getElementById(this.id);

      Chart.register(...registerables);
      Chart.register(ChartDataLabels);

      if (this.canvas !== null) {
        this.canvas.destroy();
      }

      this.canvas = new Chart(ctx, {
        type: this.type,
        data: this.data,
        options: this.options,
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
}

.chart-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  font-weight: bold;
}
</style>