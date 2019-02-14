<template>
  <div class="col-lg-12">
    <!--begin::Portlet-->
    <div class="m-portlet m-portlet--full-height">
      <div class="m-portlet__body">
        <!--begin::Section-->
        <div
          class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg"
          :id="'m_accordion_8'+idAssist"
          role="tablist"
        >
          <!--begin::Item-->
          <div class="m-accordion__item">
            <div
              class="m-accordion__item-head collapsed"
              role="tab"
              :id="'m_accordion_8_item_1_head'+idAssist"
              data-toggle="collapse"
              :href="'#m_accordion_8_item_1_body'+idAssist"
              aria-expanded="    false"
            >
              <span class="m-accordion__item-icon">
                <i class="fa flaticon-user-ok"></i>
              </span>
              <span class="m-accordion__item-title">GENERAL INFORMATION</span>
              <span class="m-accordion__item-mode"></span>
            </div>
            <div
              class="m-accordion__item-body collapse"
              :id="'m_accordion_8_item_1_body'+idAssist"
              role="tabpanel"
              :aria-labelledby="'m_accordion_8_item_1_head'+idAssist"
              :data-parent="'#m_accordion_8'+idAssist"
            >
              <div class="m-accordion__item-content">
                <!--Begin::Section-->
                <div class="m-portlet">
                  <div class="m-portlet__body m-portlet__body--no-padding">
                    <div class="row m-row--no-padding m-row--col-separator-xl">
                      <div class="col-xl-4">
                        <!--start widget14 -->
                        <div class="m-portlet__body">
                          <div class="m-widget16">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Travel Source</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.source}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Destination</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.destination}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Plan</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.namePlan}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">From</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.startDate}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">To</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.endDate}}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end widget14 -->
                      </div>
                      <div class="col-xl-4">
                        <!--start widget14 -->
                        <div class="m-portlet__body">
                          <div class="m-widget16">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="m-widget16__head">
                                <div class="m-widget16__item">
                                  <span class="m-widget16__amount m--align-center">
                                    ASSISTANCE DATA
                                  </span>
                                </div>
                              </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">First Name</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.contacto.fisrtName}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Last Name</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.lastName}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Email</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.contacto.email}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Phone</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.contacto.phone}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Passport No.</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.passport}}</span>
                                  </div>
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Date of Birth</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.birthDate}}</span>
                                  </div>
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Genre</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.genre}}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end widget14 -->
                      </div>
                      <div class="col-xl-4">
                        <!--start widget14 -->
                        <div class="m-portlet__body">
                          <div class="m-widget16">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Travel Source</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.source}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Destination</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.destination}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Plan</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.namePlan}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">From</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.startDate}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">To</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.endDate}}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end widget14 -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Item-->
          <!--begin::Item-->
          <div class="m-accordion__item">
            <div
              class="m-accordion__item-head collapsed"
              role="tab"
              :id="'m_accordion_8_item_2_head'+idAssist"
              data-toggle="collapse"
              :href="'#m_accordion_8_item_2_body'+idAssist"
              aria-expanded="false"
            >
              <span class="m-accordion__item-icon">
                <i class="fa flaticon-placeholder"></i>
              </span>
              <span class="m-accordion__item-title">ASSISTANCE DATA</span>
              <span class="m-accordion__item-mode"></span>
            </div>
            <div
              class="m-accordion__item-body collapse"
              :id="'m_accordion_8_item_2_body'+idAssist"
              role="tabpanel"
              :aria-labelledby="'m_accordion_8_item_2_head'+idAssist"
              :data-parent="'#m_accordion_8'+idAssist"
            >
              <div class="m-accordion__item-content">
                <div class="m-portlet">
                  <div class="m-portlet__body m-portlet__body--no-padding">
                    <div class="row m-row--no-padding m-row--col-separator-xl">
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Daily Sales-->
                        <div class="m-widget14">
                          <div class="m-widget14__header m--margin-bottom-30">
                            <h3 class="m-widget14__title">Daily Sales</h3>
                            <span class="m-widget14__desc">Check out each collumn for more details</span>
                          </div>
                          <div class="m-widget14__chart" style="height:120px;">
                            <canvas id="m_chart_daily_sales"></canvas>
                          </div>
                        </div>
                        <!--end:: Widgets/Daily Sales-->
                      </div>
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Profit Share-->
                        <div class="m-widget14">
                          <div class="m-widget14__header">
                            <h3 class="m-widget14__title">Profit Share</h3>
                            <span class="m-widget14__desc">Profit Share between customers</span>
                          </div>
                          <div class="row align-items-center">
                            <div class="col">
                              <div
                                id="m_chart_profit_share"
                                class="m-widget14__chart"
                                style="height: 160px"
                              >
                                <div class="m-widget14__stat">45</div>
                              </div>
                            </div>
                            <div class="col">
                              <div class="m-widget14__legends">
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-accent"></span>
                                  <span class="m-widget14__legend-text">37% Sport Tickets</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-warning"></span>
                                  <span class="m-widget14__legend-text">47% Business Events</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-brand"></span>
                                  <span class="m-widget14__legend-text">19% Others</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end:: Widgets/Profit Share-->
                      </div>
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Revenue Change-->
                        <div class="m-widget14">
                          <div class="m-widget14__header">
                            <h3 class="m-widget14__title">Revenue Change</h3>
                            <span class="m-widget14__desc">Revenue change breakdown by cities</span>
                          </div>
                          <div class="row align-items-center">
                            <div class="col">
                              <div
                                id="m_chart_revenue_change"
                                class="m-widget14__chart1"
                                style="height: 180px"
                              ></div>
                            </div>
                            <div class="col">
                              <div class="m-widget14__legends">
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-accent"></span>
                                  <span class="m-widget14__legend-text">+10% New York</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-warning"></span>
                                  <span class="m-widget14__legend-text">-7% London</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-brand"></span>
                                  <span class="m-widget14__legend-text">+20% California</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end:: Widgets/Revenue Change-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Item-->
          <!--begin::Item-->
          <div class="m-accordion__item">
            <div
              class="m-accordion__item-head collapsed"
              role="tab"
              :id="'m_accordion_8_item_3_head'+idAssist"
              data-toggle="collapse"
              :href="'#m_accordion_8_item_3_body'+idAssist"
              aria-expanded="false"
            >
              <span class="m-accordion__item-icon">
                <i class="fa flaticon-alert-2"></i>
              </span>
              <span class="m-accordion__item-title">ADDRESS</span>
              <span class="m-accordion__item-mode"></span>
            </div>
            <div
              class="m-accordion__item-body collapse"
              :id="'m_accordion_8_item_3_body'+idAssist"
              role="tabpanel"
              :aria-labelledby="'m_accordion_8_item_3_head'+idAssist"
              :data-parent="'#m_accordion_8'+idAssist"
            >
              <div class="m-accordion__item-content">
                <div class="m-portlet">
                  <div class="m-portlet__body m-portlet__body--no-padding">
                    <div class="row m-row--no-padding m-row--col-separator-xl">
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Daily Sales-->
                        <!--end:: Widgets/Daily Sales-->
                      </div>
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Profit Share-->
                        <div class="m-widget14">
                          <div class="m-widget14__header">
                            <h3 class="m-widget14__title">Profit Share</h3>
                            <span class="m-widget14__desc">Profit Share between customers</span>
                          </div>
                          <div class="row align-items-center">
                            <div class="col">
                              <div
                                id="m_chart_profit_share"
                                class="m-widget14__chart"
                                style="height: 160px"
                              >
                                <div class="m-widget14__stat">45</div>
                              </div>
                            </div>
                            <div class="col">
                              <div class="m-widget14__legends">
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-accent"></span>
                                  <span class="m-widget14__legend-text">37% Sport Tickets</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-warning"></span>
                                  <span class="m-widget14__legend-text">47% Business Events</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-brand"></span>
                                  <span class="m-widget14__legend-text">19% Others</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end:: Widgets/Profit Share-->
                      </div>
                      <div class="col-xl-4">
                        <!--begin:: Widgets/Revenue Change-->
                        <div class="m-widget14">
                          <div class="m-widget14__header">
                            <h3 class="m-widget14__title">Revenue Change</h3>
                            <span class="m-widget14__desc">Revenue change breakdown by cities</span>
                          </div>
                          <div class="row align-items-center">
                            <div class="col">
                              <div
                                id="m_chart_revenue_change"
                                class="m-widget14__chart1"
                                style="height: 180px"
                              ></div>
                            </div>
                            <div class="col">
                              <div class="m-widget14__legends">
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-accent"></span>
                                  <span class="m-widget14__legend-text">+10% New York</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-warning"></span>
                                  <span class="m-widget14__legend-text">-7% London</span>
                                </div>
                                <div class="m-widget14__legend">
                                  <span class="m-widget14__legend-bullet m--bg-brand"></span>
                                  <span class="m-widget14__legend-text">+20% California</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end:: Widgets/Revenue Change-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Item-->
        </div>
        <!--end::Section-->
      </div>
    </div>
    <!--end::Portlet-->
  </div>
</template>
<script>
export default {
  props: ["id-assist"],
  data: function() {
    return {
      assist: this.idAssist,
      results: []
    };
  },
  methods: {
    getAssistanceDetail: function() {
      this.axios
        .post("getAssistanceDetail", {
          idAssist: this.idAssist
        })
        .then(response => {
          this.results = response.data.results;
          console.log(this.results);
        });
    }
  },
  mounted() {
    this.getAssistanceDetail();
  }
};
</script>
<style>
.options-btn {
  display: inline-flex;
}
</style>