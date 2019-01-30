<template>
	<div class="m-content container-fluid">
		<div class="row">
			<div class="col-xl-12">
				<!--begin:: Widgets/Sale Reports-->
				<div class="m-portlet m-portlet--full-height ">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									Sales Reports
								</h3>
							</div>
						</div>
						<div class="m-portlet__head-tools">
							<ul class="nav nav-pills nav-pills--brand m-nav-pills--align-right m-nav-pills--btn-pill m-nav-pills--btn-sm" role="tablist">
								<li class="nav-item m-tabs__item">
									<a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_widget11_tab1_content" role="tab">
										Last Month
									</a>
								</li>
								<li class="nav-item m-tabs__item">
									<a class="nav-link m-tabs__link" data-toggle="tab" href="#m_widget11_tab2_content" role="tab">
										All Time
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="m-portlet__body">
					<!--Begin::Tab Content-->
						<div class="tab-content">
						<!--begin::tab 1 content-->
							<div class="tab-pane active" id="m_widget11_tab1_content">
								<!--begin::Widget 11-->
								<div class="m-widget11">
									<div class="table-responsive">
										<!--begin::Table-->
										<table class="table">
											<!--begin::Thead-->
											<thead>
												<tr>
													<td class="m-widget11__app">
														Numero de Caso
													</td>
													<td class="m-widget11__app">
														Compania
													</td>
													<td class="m-widget11__app">
														Voucher
													</td>
													<td class="m-widget11__app">
														Pasajeros
													</td>
													<td class="m-widget11__app">
														Sintomas
													</td>
													<td class="m-widget11__app">
														Tipo de Caso
													</td>
													<td class="m-widget11__app ">
														Fecha Evento
													</td>
													<td class="m-widget11__app ">
														Fecha Apertura
													</td>
													
													<td class="m-widget11__app ">
														Pais
													</td>
												</tr>
											</thead>
											<!--end::Thead-->
											<!--begin::Tbody-->
											<tbody>
												<tr v-for="(value, key) in resp.results">
													
													<td>
														<span class="m-widget11__title">
															{{value.codeAssist}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.clientName}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.codigo}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.fisrtName+' '+value.lastName}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.symptom}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.descCaseType}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.reportedDate.date}}
														</span>
														<span class="m-widget11__title">
															{{value.reportedDate.hour}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															{{value.registeredDate.date}}
														</span>
														<span class="m-widget11__title">
															{{value.registeredDate.hour}}
														</span>
													</td>
													<td>
														<span class="m-widget11__title">
															<img :src="'https://wtaops.com/app/images/flags_iso/svg/'+value.isoCountry.toLowerCase()+'.svg'" width="40px"/>
														</span>
													</td>
												</tr>
												
											</tbody>
											<!--end::Tbody-->
										</table>
										<!--end::Table-->
									</div>
									<div class="m-widget11__action m--align-right">
										<button type="button" class="btn m-btn--pill btn-outline-brand m-btn m-btn--custom">
											Import Report
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./Table.js"></script>
