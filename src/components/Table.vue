<template>
	<content class="m-content">
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
													<td class="m-widget11__label">
														#
													</td>
													<td class="m-widget11__app">
														Application
													</td>
													<td class="m-widget11__sales">
														Sales
													</td>
													<td class="m-widget11__price">
														Avg Price
													</td>
													<td class="m-widget11__total m--align-right">
														Total
													</td>
												</tr>
											</thead>
											<!--end::Thead-->
											<!--begin::Tbody-->
											<tbody>
												<tr>
													<td>
														<label class="m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand">
															<input type="checkbox">
															<span></span>
														</label>
													</td>
													<td>
														<span class="m-widget11__title">
															Vertex 2.0
														</span>
														<span class="m-widget11__sub">
															Vertex To By Again
														</span>
													</td>
													<td>
														19,200
													</td>
													<td>
														$63
													</td>
													<td class="m--align-right m--font-brand">
														$14,740
													</td>
												</tr>
												<tr>
													<td>
														<label class="m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand">
															<input type="checkbox">
															<span></span>
														</label>
													</td>
													<td>
														<span class="m-widget11__title">
															Metronic
														</span>
														<span class="m-widget11__sub">
															Powerful Admin Theme
														</span>
													</td>
													<td>
														24,310
													</td>
													<td>
														$39
													</td>
													<td class="m--align-right m--font-brand">
														$16,010
													</td>
												</tr>
												<tr>
													<td>
														<label class="m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand">
															<input type="checkbox">
															<span></span>
														</label>
													</td>
													<td>
														<span class="m-widget11__title">
															Apex
														</span>
														<span class="m-widget11__sub">
															The Best Selling App
														</span>
													</td>
													<td>
														9,076
													</td>
													<td>
														$105
													</td>
													<td class="m--align-right m--font-brand">
														$37,200
													</td>
												</tr>
												<tr>
													<td>
														<label class="m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand">
															<input type="checkbox">
															<span></span>
														</label>
													</td>
													<td>
														<span class="m-widget11__title">
															Cascades
														</span>
														<span class="m-widget11__sub">
															Design Tool
														</span>
													</td>
													<td>
														11,094
													</td>
													<td>
														$16
													</td>
													<td class="m--align-right m--font-brand">
														$8,520
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
	</content>
</template>
<script>
export default {
  name: 'Content',
  
}
</script>