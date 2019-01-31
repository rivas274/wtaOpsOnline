<template>
	<body style="font-family: roboto;">
		<div class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
			<Header></Header>
			<div class="m-grid m-grid--hor m-grid--root m-page">
        		<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
					<Menu></Menu>
					<Tables></Tables>
        		</div>
        	</div>
		</div>
	<Footer></Footer>
	</body>
</template>
<script>

import Footer from './Footer.vue';
import Menu from './Menu.vue';
import Header from './Header.vue';
import Tables from './Tables/Table.vue';

export default {
  name: 'Content',
  components: {
		Footer,
		Menu,
		Header,
		Tables
  }
}

</script>