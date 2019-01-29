<template>
	<body>
		<div class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
			<Header></Header>
			<Menu></Menu>
			<Table></Table>
		</div>
	<Footer></Footer>
	</body>
</template>
<script>

import Footer from './Footer.vue';
import Menu from './Menu.vue';
import Header from './Header.vue';
import Table from './Table.vue';

export default {
  name: 'Content',
  components: {
		Footer,
		Menu,
		Header,
		Table
  }
}

</script>