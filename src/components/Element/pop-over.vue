<style>
a.toggle-popover {
    cursor: pointer;
}
</style>

<template>
    <a
        data-trigger="focus"
        tabindex="-1"
        :data-placement="placement"
        :class="[classProp]"
        class="toggle-popover"
        :title="title"
    >
        <slot name="button"></slot>
        <div style="display:none" class="popover-content">
            <slot name="content"></slot>
        </div>
    </a>
</template>

<script>
export default {
    props: ["title", "placement", "classProp"],
    mounted() {
        window.$(this.$el).popover({
            html: true,
            title: function() {
                return window.$(this).attr("title");
            },
            content: function() {
                return window.$(this)
                    .find(".popover-content")
                    .html();
            }
        });
    }
};
</script>