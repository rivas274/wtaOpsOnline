<template>

  <body  class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >
		<div class="m-grid m-grid--hor m-grid--root m-page">
		
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
				<!-- BEGIN: Left Aside -->
				<button class="m-aside-left-close m-aside-left-close--skin-dark" id="m_aside_left_close_btn">
					<i class="la la-close"></i>
				</button>
				<div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
					<!-- BEGIN: Aside Menu -->
			<div id="m_ver_menu" 
				class="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark m-aside-menu--dropdown " 
				data-menu-vertical="true"
				m-menu-dropdown="1" m-menu-scrollable="0" m-menu-dropdown-timeout="500"  
				>
						<ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
							<li class="m-menu__item  m-menu__item--active" aria-haspopup="true" >
								<a  href="index.html" class="m-menu__link ">
									<span class="m-menu__item-here"></span>
									<i class="m-menu__link-icon flaticon-line-graph"></i>
									<span class="m-menu__link-text">
										Dashboard
									</span>
								</a>
							</li>
							<li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover">
								<a  href="javascript:;" class="m-menu__link m-menu__toggle">
									<span class="m-menu__item-here"></span>
									<i class="m-menu__link-icon flaticon-open-box"></i>
									<span class="m-menu__link-text">
										Layouts
									</span>
									<i class="m-menu__ver-arrow la la-angle-right"></i>
								</a>
								<div class="m-menu__submenu ">
									<span class="m-menu__arrow"></span>
									<ul class="m-menu__subnav">
										<li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
											<span class="m-menu__link">
												<span class="m-menu__item-here"></span>
												<span class="m-menu__link-text">
													Layouts
												</span>
											</span>
										</li>
										<li class="m-menu__item " aria-haspopup="true" >
											<a  href="builder.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Layout Builder
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="builder.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Boxed Layout
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="builder.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Right Sidebar
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="builder.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Fixed Footer
												</span>
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover">
								<a  href="javascript:;" class="m-menu__link m-menu__toggle">
									<span class="m-menu__item-here"></span>
									<i class="m-menu__link-icon flaticon-layers"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Reports
											</span>
											<span class="m-menu__link-badge">
												<span class="m-badge m-badge--danger">
													2
												</span>
											</span>
										</span>
									</span>
									<i class="m-menu__ver-arrow la la-angle-right"></i>
								</a>
								<div class="m-menu__submenu ">
									<span class="m-menu__arrow"></span>
									<ul class="m-menu__subnav">
										<li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
											<span class="m-menu__link">
												<span class="m-menu__item-here"></span>
												<span class="m-menu__link-title">
													<span class="m-menu__link-wrap">
														<span class="m-menu__link-text">
															Reports
														</span>
														<span class="m-menu__link-badge">
															<span class="m-badge m-badge--danger">
																2
															</span>
														</span>
													</span>
												</span>
											</span>
										</li>
										<li class="m-menu__item " aria-haspopup="true" >
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-icon flaticon-pie-chart"></i>
												<span class="m-menu__link-text">
													Finance Reports
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-icon flaticon-line-graph"></i>
												<span class="m-menu__link-text">
													Accouning Audit
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-icon flaticon-statistics"></i>
												<span class="m-menu__link-text">
													Investments
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-icon flaticon-coins"></i>
												<span class="m-menu__link-text">
													Sales
												</span>
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
								<a  href="javascript:;" class="m-menu__link m-menu__toggle">
									<span class="m-menu__item-here"></span>
									<i class="m-menu__link-icon flaticon-lifebuoy"></i>
									<span class="m-menu__link-text">
										Support
									</span>
									<i class="m-menu__ver-arrow la la-angle-right"></i>
								</a>
								<div class="m-menu__submenu ">
									<span class="m-menu__arrow"></span>
									<ul class="m-menu__subnav">
										<li class="m-menu__item  m-menu__item--parent" aria-haspopup="true"  m-menu-link-redirect="1">
											<span class="m-menu__link">
												<span class="m-menu__item-here"></span>
												<span class="m-menu__link-text">
													Support
												</span>
											</span>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Reports
												</span>
											</a>
										</li>
										<li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
											<a  href="javascript:;" class="m-menu__link m-menu__toggle">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Cases
												</span>
												<i class="m-menu__ver-arrow la la-angle-right"></i>
											</a>
											<div class="m-menu__submenu ">
												<span class="m-menu__arrow"></span>
												<ul class="m-menu__subnav">
													<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
														<a  href="inner.html" class="m-menu__link ">
															<i class="m-menu__link-icon flaticon-computer"></i>
															<span class="m-menu__link-title">
																<span class="m-menu__link-wrap">
																	<span class="m-menu__link-text">
																		Pending
																	</span>
																	<span class="m-menu__link-badge">
																		<span class="m-badge m-badge--warning m-badge--wide">
																			10
																		</span>
																	</span>
																</span>
															</span>
														</a>
													</li>
													<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
														<a  href="inner.html" class="m-menu__link ">
															<i class="m-menu__link-icon flaticon-signs-2"></i>
															<span class="m-menu__link-title">
																<span class="m-menu__link-wrap">
																	<span class="m-menu__link-text">
																		Urgent
																	</span>
																	<span class="m-menu__link-badge">
																		<span class="m-badge m-badge--danger m-badge--wide">
																			6
																		</span>
																	</span>
																</span>
															</span>
														</a>
													</li>
													<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
														<a  href="inner.html" class="m-menu__link ">
															<i class="m-menu__link-icon flaticon-clipboard"></i>
															<span class="m-menu__link-title">
																<span class="m-menu__link-wrap">
																	<span class="m-menu__link-text">
																		Done
																	</span>
																	<span class="m-menu__link-badge">
																		<span class="m-badge m-badge--success m-badge--wide">
																			2
																		</span>
																	</span>
																</span>
															</span>
														</a>
													</li>
													<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
														<a  href="inner.html" class="m-menu__link ">
															<i class="m-menu__link-icon flaticon-multimedia-2"></i>
															<span class="m-menu__link-title">
																<span class="m-menu__link-wrap">
																	<span class="m-menu__link-text">
																		Archive
																	</span>
																	<span class="m-menu__link-badge">
																		<span class="m-badge m-badge--info m-badge--wide">
																			245
																		</span>
																	</span>
																</span>
															</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Clients
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Audit
												</span>
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
								<a  href="javascript:;" class="m-menu__link m-menu__toggle">
									<span class="m-menu__item-here"></span>
									<i class="m-menu__link-icon flaticon-share"></i>
									<span class="m-menu__link-text">
										Feedbacks
									</span>
									<i class="m-menu__ver-arrow la la-angle-right"></i>
								</a>
								<div class="m-menu__submenu ">
									<span class="m-menu__arrow"></span>
									<ul class="m-menu__subnav">
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-title">
													<span class="m-menu__link-wrap">
														<span class="m-menu__link-text">
															Product Feedbacks
														</span>
														<span class="m-menu__link-badge">
															<span class="m-badge m-badge--accent">
																3
															</span>
														</span>
													</span>
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Customer Reviews
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Product Ratings
												</span>
											</a>
										</li>
										<li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
											<a  href="inner.html" class="m-menu__link ">
												<i class="m-menu__link-bullet m-menu__link-bullet--dot">
													<span></span>
												</i>
												<span class="m-menu__link-text">
													Customer Support
												</span>
											</a>
										</li>
									</ul>
								</div>
							</li>
							
						</ul>
					</div>
					<!-- END: Aside Menu -->
				</div>
				<!-- END: Left Aside -->
				<div class="m-grid__item m-grid__item--fluid m-wrapper">
					<!-- BEGIN: Subheader -->
					
					
					<!-- END: Subheader -->
					<div class="m-content">
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
												<!--end::Widget 11-->
											</div>
											<!--end::tab 1 content-->
			<!--begin::tab 2 content-->
											<div class="tab-pane" id="m_widget11_tab2_content">
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
																	<td class="m-widget11__change">
																		Change
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
																			Loop
																		</span>
																		<span class="m-widget11__sub">
																			CRM System
																		</span>
																	</td>
																	<td>
																		19,200
																	</td>
																	<td>
																		$63
																	</td>
																	<td>
																		$11,300
																	</td>
																	<td class="m--align-right m--font-brand">
																		$34,740
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
																			Selto
																		</span>
																		<span class="m-widget11__sub">
																			Powerful Website Builder
																		</span>
																	</td>
																	<td>
																		24,310
																	</td>
																	<td>
																		$39
																	</td>
																	<td>
																		$14,700
																	</td>
																	<td class="m--align-right m--font-brand">
																		$46,010
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
																			Jippo
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
																	<td>
																		$8,400
																	</td>
																	<td class="m--align-right m--font-brand">
																		$67,800
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
																			Verto
																		</span>
																		<span class="m-widget11__sub">
																			Web Development Tool
																		</span>
																	</td>
																	<td>
																		11,094
																	</td>
																	<td>
																		$16
																	</td>
																	<td>
																		$12,500
																	</td>
																	<td class="m--align-right m--font-brand">
																		$18,520
																	</td>
																</tr>
															</tbody>
															<!--end::Tbody-->
														</table>
														<!--end::Table-->
													</div>
													<div class="m-widget11__action m--align-right">
														<button type="button" class="btn m-btn--pill btn-outline-brand m-btn m-btn--custom">
															Generate Report
														</button>
													</div>
												</div>
												<!--end::Widget 11-->
											</div>
											<!--end::tab 2 content-->
			<!--begin::tab 3 content-->
											<div class="tab-pane" id="m_widget11_tab3_content"></div>
											<!--end::tab 3 content-->
										</div>
										<!--End::Tab Content-->
									</div>
								</div>
								<!--end:: Widgets/Sale Reports-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end:: Body -->
<!-- begin::Footer -->
			<footer class="m-grid__item		m-footer ">
				<div class="m-container m-container--fluid m-container--full-height m-page__container">
					<div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
						<div class="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
							<span class="m-footer__copyright">
								2017 &copy; Metronic theme by
								<a href="https://keenthemes.com" class="m-link">
									Keenthemes
								</a>
							</span>
						</div>
						<div class="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
							<ul class="m-footer__nav m-nav m-nav--inline m--pull-right">
								<li class="m-nav__item">
									<a href="#" class="m-nav__link">
										<span class="m-nav__link-text">
											About
										</span>
									</a>
								</li>
								<li class="m-nav__item">
									<a href="#"  class="m-nav__link">
										<span class="m-nav__link-text">
											Privacy
										</span>
									</a>
								</li>
								<li class="m-nav__item">
									<a href="#" class="m-nav__link">
										<span class="m-nav__link-text">
											T&C
										</span>
									</a>
								</li>
								<li class="m-nav__item">
									<a href="#" class="m-nav__link">
										<span class="m-nav__link-text">
											Purchase
										</span>
									</a>
								</li>
								<li class="m-nav__item m-nav__item">
									<a href="#" class="m-nav__link" data-toggle="m-tooltip" title="Support Center" data-placement="left">
										<i class="m-nav__link-icon flaticon-info m--icon-font-size-lg3"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
			<!-- end::Footer -->
		</div>

		<div id="m_quick_sidebar" class="m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light">
			<div class="m-quick-sidebar__content m--hide">
				<span id="m_quick_sidebar_close" class="m-quick-sidebar__close">
					<i class="la la-close"></i>
				</span>
				<ul id="m_quick_sidebar_tabs" class="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
					<li class="nav-item m-tabs__item">
						<a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_quick_sidebar_tabs_messenger" role="tab">
							Messages
						</a>
					</li>
					<li class="nav-item m-tabs__item">
						<a class="nav-link m-tabs__link" 		data-toggle="tab" href="#m_quick_sidebar_tabs_settings" role="tab">
							Settings
						</a>
					</li>
					<li class="nav-item m-tabs__item">
						<a class="nav-link m-tabs__link" data-toggle="tab" href="#m_quick_sidebar_tabs_logs" role="tab">
							Logs
						</a>
					</li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active" id="m_quick_sidebar_tabs_messenger" role="tabpanel">
						<div class="m-messenger m-messenger--message-arrow m-messenger--skin-light">
							<div class="m-messenger__messages m-scrollable">
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--in">
										<div class="m-messenger__message-pic">
											<img src="assets/app/media/img//users/user3.jpg" alt=""/>
										</div>
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-username">
													Megan wrote
												</div>
												<div class="m-messenger__message-text">
													Hi Bob. What time will be the meeting ?
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--out">
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-text">
													Hi Megan. It's at 2.30PM
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--in">
										<div class="m-messenger__message-pic">
											<img src="assets/app/media/img//users/user3.jpg" alt=""/>
										</div>
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-username">
													Megan wrote
												</div>
												<div class="m-messenger__message-text">
													Will the development team be joining ?
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--out">
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-text">
													Yes sure. I invited them as well
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__datetime">
									2:30PM
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--in">
										<div class="m-messenger__message-pic">
											<img src="assets/app/media/img//users/user3.jpg"  alt=""/>
										</div>
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-username">
													Megan wrote
												</div>
												<div class="m-messenger__message-text">
													Noted. For the Coca-Cola Mobile App project as well ?
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--out">
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-text">
													Yes, sure.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--out">
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-text">
													Please also prepare the quotation for the Loop CRM project as well.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__datetime">
									3:15PM
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--in">
										<div class="m-messenger__message-no-pic m--bg-fill-danger">
											<span>
												M
											</span>
										</div>
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-username">
													Megan wrote
												</div>
												<div class="m-messenger__message-text">
													Noted. I will prepare it.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--out">
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-text">
													Thanks Megan. I will see you later.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="m-messenger__wrapper">
									<div class="m-messenger__message m-messenger__message--in">
										<div class="m-messenger__message-pic">
											<img src="assets/app/media/img//users/user3.jpg"  alt=""/>
										</div>
										<div class="m-messenger__message-body">
											<div class="m-messenger__message-arrow"></div>
											<div class="m-messenger__message-content">
												<div class="m-messenger__message-username">
													Megan wrote
												</div>
												<div class="m-messenger__message-text">
													Sure. See you in the meeting soon.
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="m-messenger__seperator"></div>
							<div class="m-messenger__form">
								<div class="m-messenger__form-controls">
									<input type="text" name="" placeholder="Type here..." class="m-messenger__form-input">
								</div>
								<div class="m-messenger__form-tools">
									<a href="" class="m-messenger__form-attachment">
										<i class="la la-paperclip"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="m_quick_sidebar_tabs_settings" role="tabpanel">
						<div class="m-list-settings m-scrollable">
							<div class="m-list-settings__group">
								<div class="m-list-settings__heading">
									General Settings
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Email Notifications
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" checked="checked" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Site Tracking
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										SMS Alerts
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Backup Storage
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Audit Logs
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" checked="checked" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
							</div>
							<div class="m-list-settings__group">
								<div class="m-list-settings__heading">
									System Settings
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										System Logs
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Error Reporting
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Applications Logs
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Backup Servers
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" checked="checked" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
								<div class="m-list-settings__item">
									<span class="m-list-settings__item-label">
										Audit Logs
									</span>
									<span class="m-list-settings__item-control">
										<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
											<label>
												<input type="checkbox" name="">
												<span></span>
											</label>
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="m_quick_sidebar_tabs_logs" role="tabpanel">
						<div class="m-list-timeline m-scrollable">
							<div class="m-list-timeline__group">
								<div class="m-list-timeline__heading">
									System Logs
								</div>
								<div class="m-list-timeline__items">
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											12 new users registered
											<span class="m-badge m-badge--warning m-badge--wide">
												important
											</span>
										</a>
										<span class="m-list-timeline__time">
											Just now
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											System shutdown
										</a>
										<span class="m-list-timeline__time">
											11 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
										<a href="" class="m-list-timeline__text">
											New invoice received
										</a>
										<span class="m-list-timeline__time">
											20 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
										<a href="" class="m-list-timeline__text">
											Database overloaded 89%
											<span class="m-badge m-badge--success m-badge--wide">
												resolved
											</span>
										</a>
										<span class="m-list-timeline__time">
											1 hr
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											System error
										</a>
										<span class="m-list-timeline__time">
											2 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											Production server down
											<span class="m-badge m-badge--danger m-badge--wide">
												pending
											</span>
										</a>
										<span class="m-list-timeline__time">
											3 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											Production server up
										</a>
										<span class="m-list-timeline__time">
											5 hrs
										</span>
									</div>
								</div>
							</div>
							<div class="m-list-timeline__group">
								<div class="m-list-timeline__heading">
									Applications Logs
								</div>
								<div class="m-list-timeline__items">
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											New order received
											<span class="m-badge m-badge--info m-badge--wide">
												urgent
											</span>
										</a>
										<span class="m-list-timeline__time">
											7 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											12 new users registered
										</a>
										<span class="m-list-timeline__time">
											Just now
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											System shutdown
										</a>
										<span class="m-list-timeline__time">
											11 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
										<a href="" class="m-list-timeline__text">
											New invoices received
										</a>
										<span class="m-list-timeline__time">
											20 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
										<a href="" class="m-list-timeline__text">
											Database overloaded 89%
										</a>
										<span class="m-list-timeline__time">
											1 hr
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											System error
											<span class="m-badge m-badge--info m-badge--wide">
												pending
											</span>
										</a>
										<span class="m-list-timeline__time">
											2 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											Production server down
										</a>
										<span class="m-list-timeline__time">
											3 hrs
										</span>
									</div>
								</div>
							</div>
							<div class="m-list-timeline__group">
								<div class="m-list-timeline__heading">
									Server Logs
								</div>
								<div class="m-list-timeline__items">
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											Production server up
										</a>
										<span class="m-list-timeline__time">
											5 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											New order received
										</a>
										<span class="m-list-timeline__time">
											7 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											12 new users registered
										</a>
										<span class="m-list-timeline__time">
											Just now
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											System shutdown
										</a>
										<span class="m-list-timeline__time">
											11 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
										<a href="" class="m-list-timeline__text">
											New invoice received
										</a>
										<span class="m-list-timeline__time">
											20 mins
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
										<a href="" class="m-list-timeline__text">
											Database overloaded 89%
										</a>
										<span class="m-list-timeline__time">
											1 hr
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											System error
										</a>
										<span class="m-list-timeline__time">
											2 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											Production server down
										</a>
										<span class="m-list-timeline__time">
											3 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
										<a href="" class="m-list-timeline__text">
											Production server up
										</a>
										<span class="m-list-timeline__time">
											5 hrs
										</span>
									</div>
									<div class="m-list-timeline__item">
										<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
										<a href="" class="m-list-timeline__text">
											New order received
										</a>
										<span class="m-list-timeline__time">
											1117 hrs
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="m_scroll_top" class="m-scroll-top">
			<i class="la la-arrow-up"></i>
		</div>
		

		

	</body>
</template>
<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods : {
	customFetch : function() {
		this.data = this.fetchData('http://apilayer.net/api/historical?access_key=3da0e9a1d2bb1bee46cb1dc1b2302aa7&date=2018-09-19&source=USD&currencies=COP');
		console.log('entra');
	}
  }
}

</script>

