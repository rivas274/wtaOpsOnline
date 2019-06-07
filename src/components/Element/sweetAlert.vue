<template>
  <div class="swal2-container swal2-center swal2-fade swal2-shown" style="overflow-y: auto;" v-show="display">
    <div
      aria-labelledby="swal2-title"
      aria-describedby="swal2-content"
      class="swal2-popup swal2-modal swal2-show"
      tabindex="-1"
      role="dialog"
      aria-live="assertive"
      aria-modal="true"
      style="display: flex;"
    >
      <div class="swal2-header">
        <div class="swal2-icon swal2-question" style="display: none;">
          <span class="swal2-icon-text">?</span>
        </div>
        <div class="swal2-icon swal2-warning" style="display: none;">
          <span class="swal2-icon-text">!</span>
        </div>
        <div class="swal2-icon swal2-info" style="display: none;">
          <span class="swal2-icon-text">i</span>
        </div>
        <div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex;">
          <div
            class="swal2-success-circular-line-left"
            style="background-color: rgb(255, 255, 255);"
          ></div>
          <span class="swal2-success-line-tip"></span>
          <span class="swal2-success-line-long"></span>
          <div class="swal2-success-ring"></div>
          <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
          <div
            class="swal2-success-circular-line-right"
            style="background-color: rgb(255, 255, 255);"
          ></div>
        </div>
        <img class="swal2-image" style="display: none;">
        <h2 class="swal2-title" id="swal2-title">Good job!</h2>
        <button type="button" class="swal2-close" ref="close">×</button>
      </div>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block;">You clicked the button!</div>
        <input class="swal2-input" style="display: none;">
        <input type="file" class="swal2-file" style="display: none;">
        <div class="swal2-range" style="display: none;">
          <input type="range">
          <output></output>
        </div>
        <select class="swal2-select" style="display: none;"></select>
        <div class="swal2-radio" style="display: none;"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none;">
          <input type="checkbox">
        </label>
        <textarea class="swal2-textarea" style="display: none;"></textarea>
        <div class="swal2-validationerror" id="swal2-validationerror" style="display: none;"></div>
      </div>
      <div class="swal2-actions" style="display: flex;">
        <button
          type="button"
          class="swal2-confirm swal2-styled"
          aria-label
          style="border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);"
          
        >OK</button>
        <button
          type="button"
          class="swal2-cancel swal2-styled"
          aria-label
          style="display: none;"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props:["display","icon"]
    }
</script>