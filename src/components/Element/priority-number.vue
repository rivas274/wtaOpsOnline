<style>
.priority-number {
  border-radius: 0.45em;
  width: min-content;
  padding: 0.05em 0.45em;
  font-size: 1.4em;
  font-weight: bold;
  color: white;
  margin: auto;
}
</style>
<template>
  <label class="priority-number" :class="[classProp?'btn-'+classProp:'btn-primary']">
    <slot></slot>
  </label>
</template>
<script>
export default {
  props: ["classProp"]
};
</script>

