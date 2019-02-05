<template>
	<div class="m-grid m-grid--hor m-grid--root m-page">
		<Header></Header>
		<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
			<Menu></Menu>
			<Tables></Tables>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>

import Footer from './Footer.vue';
import Header from './Header.vue';
import Menu from './Menu.vue';
import Tables from './Tables/Table.vue';

export default {
  name: 'Content',
  components: {
		Footer,
		Header,
		Tables,
		Menu
  }
}

</script>