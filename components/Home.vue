<template>
  <div class="flex flex-col text-center mt-5">
    <div>
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-xl"
            >✨ Expression Evaluator ✨</a
          >
        </div>
        <div class="navbar-end"></div>
      </div>
    </div>
    <div class="w-full">
      <textarea
        class="textarea textarea-warning w-8/12 h-64"
        placeholder="Type Expression Here"
        v-model="expression"
      ></textarea>
    </div>
    <div>
      <a class="btn btn-ghost normal-case text-sm">Question Codes</a>
    </div>
    <div
      v-for="(context, index) in contextMapArray"
      :key="index"
      class="p-1 items-center align-middle"
    >
      <div class="items-center align-middle">
        <input
          type="text"
          :placeholder="context.qcode"
          v-model="context.qcode"
          class="input input-bordered input-error w-full max-w-xs"
        />
        <input
          type="text"
          :placeholder="context.value"
          v-model="context.value"
          class="input input-bordered input-warning w-1/6 max-w-xs"
        />
        <button
          class="btn btn-circle btn-warning btn-sm mt-1"
          v-if="contextMapArray.length !== 1"
          @click="contextMapArray.splice(index, 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button class="btn btn-circle btn-success btn-sm mt-1" @click="addQcode()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
    <div>
      <button
        class="btn btn-outline btn-success w-8/12 mt-3"
        @click="evaluate()"
      >
        Evaluate
      </button>
    </div>
    <div class="mt-5" v-if="status">
      <div class="badge badge-secondary badge-outline">{{ status }}</div>
    </div>
    <div class="mt-5" v-else>
      <div class="badge badge-primary badge-outline">false</div>
    </div>
  </div>
</template>

<script>
import expressionEvaluator from "@/lib/expressionEvaluator";
export default {
  data() {
    return {
      expression: "",
      status: "",
      contextMapArray: [{ qcode: "QCode", value: "" }],
      contextMap: {},
    };
  },
  methods: {
    async evaluate() {
      if (this.expression) {
        await this.generateContextMap();
        this.status = expressionEvaluator(this.expression, this.contextMap);
      }
      console.log(`status ${this.status}`);
    },
    generateContextMap() {
      this.contextMapArray.forEach((element) => {
        this.contextMap[element.qcode] = element.value;
      });
    },
    addQcode() {
      this.contextMapArray.push({ qcode: "QCode", value: "" });
    },
  },
};
</script>

<style></style>
