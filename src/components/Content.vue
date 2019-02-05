<template>
	<div>
		<div class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
			
			<div class="m-grid m-grid--hor m-grid--root m-page">
				<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
					<Menu></Menu>
					<Tables :thead="headerTable" :tbody="bodyTable" :tfooter="footerTable">
						<template slot="header">
							Asistencias
						</template>
						<template slot="filters">
							<inputFromTable 
								name='searchPassager' 
								watermark='Passager' 
								v-on:input="setDataFilter"
								></inputFromTable>
						</template>
						<template slot="footer">
							<pagination 
								:start="footerTable.start"
								:limit="footerTable.limit"
								:size="footerTable.size"
								v-on:paginate="setDataPaginate">
							</pagination>
						</template>
					</Tables>
        		</div>
        	</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>

import Footer from './Footer.vue';
import Menu from './Menu.vue';
import Tables from './Tables/Table.vue';
import inputFromTable from './Tables/filters/inputFromTable.vue';
import pagination from "./pagination/pagination.vue";
export default {
  	name: 'Content',
	components: {
		Footer,
		Menu,
		Tables,
		inputFromTable,
		pagination,
	},
    data: function () {
        return {
			filters:{
				searchPassager:''
			},
			headerTable:[
				{
					prop: "codeAssist",
					label: "Codigo de asistencia"
				},
				{
					prop: "codigo",
					label: "Codigo voucher"
				},
				{
					prop: "fisrtName",
					label: "fisrt Name"
				},
				{
					prop: "lastName",
					label: "Last Name"
				},
				{
					prop: "registeredDate",
					filter:function(val){
						return val.date+' '+val.hour;
					},
					label: "Codigo voucher"
				}
			],
			bodyTable: [],
			footerTable:{
				start: 0,
				limit: 15,
				size: 0,
			}
        }
    },
    methods: {
        getAssistance: function () {
            this.axios.post("getAssistance", {
					'start':this.footerTable.start,
					'limit':this.footerTable.limit,
					'size':this.footerTable.size,
					'passenger':this.filters.searchPassager,
				}).then(response => {
                this.bodyTable = response.data.results;
                this.footerTable = {
					start:response.data.start,
					limit:response.data.limit,
					size:response.data.size,
				}
            });
        },
        setDataFilter: function (campo, value) {
			this.filters[campo] = value;
			this.getAssistance();
        },
        setDataPaginate: function (campo, value) {
			this.footerTable[campo] = value;
			this.getAssistance();
        },
    },
    mounted() {
        this.getAssistance();
    },
}

</script>