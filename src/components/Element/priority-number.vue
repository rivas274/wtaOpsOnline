<style>
.priority-number {
    padding: 0.25em 0.47em !important;
    font-size: 1.5em;
    font-weight: bold;
}
</style>
<template>
    <label
        class="priority-number m-badge m-badge--wide"
        :class="[color?'m-badge--'+color:'m-badge--primary']"
    >
        <slot></slot>
    </label>
</template>
<script>
export default {
    props: ["color"]
};
</script>

