<template>
  <footer class="m-grid__item m-footer">
    <div class="m-container m-container--fluid m-container--full-height m-page__container">
      <div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
        <div class="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
          <span class="m-footer__copyright">
						&copy;2012 - {{ new Date().getFullYear() }} 
						<a href="#" class="m-link">
							ILS-D2PW
						</a>, All rights reserved.
					</span>
        </div>
        <div class="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
          <ul class="m-footer__nav m-nav m-nav--inline m--pull-right">
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                <span class="m-nav__link-text">About</span>
              </a>
            </li>
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                <span class="m-nav__link-text">Privacy</span>
              </a>
            </li>
            <li class="m-nav__item m-nav__item">
              <a
                class="m-nav__link"
                data-toggle="m-tooltip"
                v-tooltip:top="'Support Center'"
                data-placement="left"
              >
                <i class="m-nav__link-icon flaticon-info m--icon-font-size-lg3"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer"
};
</script>