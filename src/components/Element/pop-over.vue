<style>
a.toggle-popover {
  cursor: pointer;
}
</style>

<template>
  <a data-trigger="focus" tabindex="-1" :data-placement='placement' :class="[classProp]" class="toggle-popover" :title="title">
    <slot name="button"></slot>
    <div style="display:none" class="popover-content">
      <slot name="content"></slot>
    </div>
  </a>
</template>

<script>
export default {
  props: ["title","placement","classProp"],
  mounted() {
    $(this.$el).popover({
      html: true,
      title: function() {
        return $(this).attr("title");
      },
      content: function() {
        return $(this)
          .find(".popover-content")
          .html();
      }
    });
  }
};
</script>