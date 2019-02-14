<style src="../Element/custom-m-loader.css"></style>
<template>
  <div class="col-lg-12" :class="{'m-loader m-loader--metal m-loader--div':showLoader}">
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
                                <div class="m-widget16__head">
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__amount m--align-center">ASSISTANCE DATA</span>
                                  </div>
                                </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Travel Source</span>
                                    <span class="m-widget16__price m--align-right m--font-brand">
                                      <Flag :iso="results.voucher.source"></Flag>
                                    </span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Destination</span>
                                    <span class="m-widget16__price m--align-right m--font-danger">
                                      <Flag :iso="results.voucher.destination"></Flag>
                                    </span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.voucher.namePlan">
                                    <span class="m-widget16__date">Plan</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.namePlan}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">From</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.startDate}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">To</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.endDate}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Purchase Date</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.purchaseDate}}</span>
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
                                    <span class="m-widget16__amount m--align-center">BENEFICIARIES</span>
                                  </div>
                                </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">First Name</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.passenger.fisrtName}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Last Name</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.passenger.lastName}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.passenger.email">
                                    <span class="m-widget16__date">Email</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.passenger.email}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.passenger.phone">
                                    <span class="m-widget16__date">Phone</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.passenger.phone}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item" v-if="results.passenger.passport">
                                    <span class="m-widget16__date">Passport No.</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.passenger.passport}}</span>
                                  </div>
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Date of Birth</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.passenger.birthDate}}</span>
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
                                    <span
                                      class="m-widget16__amount m--align-center"
                                    >OTHER INFORMATION</span>
                                  </div>
                                </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Observations</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span>{{results.contactObservation}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <div
                                    class="m-widget16__item"
                                    v-if="results.voucher.contacto.name || results.voucher.contacto.email || results.voucher.contacto.phone"
                                  >
                                    <span
                                      class="m-widget16__amount m--align-center"
                                    >Contact Emergency</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div
                                    class="m-widget16__item"
                                    v-if="results.voucher.contacto.name"
                                  >
                                    <span class="m-widget16__date">Name</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.contacto.name}}</span>
                                  </div>
                                  <div
                                    class="m-widget16__item"
                                    v-if="results.voucher.contacto.email"
                                  >
                                    <span class="m-widget16__date">Email</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.voucher.contacto.email}}</span>
                                  </div>
                                  <div
                                    class="m-widget16__item"
                                    v-if="results.voucher.contacto.phone"
                                  >
                                    <span class="m-widget16__date">Phone</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.voucher.contacto.phone}}</span>
                                  </div>
                                  <!--end::widget item-->
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
                <i class="fa flaticon-alert-2"></i>
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
                        <!--start widget14 -->
                        <div class="m-portlet__body">
                          <div class="m-widget16">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="m-widget16__head">
                                  <div class="m-widget16__item">
                                    <span
                                      class="m-widget16__amount m--align-center"
                                    >ASSISTANCE CONCTACT</span>
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
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.phone}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Passport No.</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.contacto.passport}}</span>
                                  </div>
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Date of Birth</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.contacto.birthDate}}</span>
                                  </div>
                                  <div class="m-widget16__item" v-if="results.contacto.genre">
                                    <span class="m-widget16__date">Genre</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
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
                                <div class="m-widget16__head">
                                  <div class="m-widget16__item">
                                    <span
                                      class="m-widget16__amount m--align-center"
                                    >INFORMATION ASSISTANCE</span>
                                  </div>
                                </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Source</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.origenAssist}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Relation</span>
                                    <span class="m-widget16__price m--align-right m--font-danger"></span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Case Type</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.caseType}}</span>
                                  </div>
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Symptoms</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.symptom}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--end::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Type of Coordination</span>
                                    <span class="m-widget16__price m--align-right m--font-brand"></span>
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
                                    <span class="m-widget16__amount m--align-center">DESCRIPTION</span>
                                  </div>
                                </div>
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span
                                      class="m-widget16__date m--align-center"
                                      v-if="!results.contactObservation"
                                    >N/A</span>
                                    <span
                                      class="m-widget16__date m--align-center"
                                      v-if="results.contactObservation"
                                    >{{results.contactObservation}}</span>
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
              :id="'m_accordion_8_item_3_head'+idAssist"
              data-toggle="collapse"
              :href="'#m_accordion_8_item_3_body'+idAssist"
              aria-expanded="false"
            >
              <span class="m-accordion__item-icon">
                <i class="fa flaticon-placeholder"></i>
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
                        <!--start widget14 -->
                        <div class="m-portlet__body">
                          <div class="m-widget16">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="m-widget16__body">
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.location.isoCountry">
                                    <span class="m-widget16__date">Country</span>
                                    <span class="m-widget16__price m--align-right m--font-brand">
                                      <Flag :iso="results.location.isoCountry"></Flag>
                                    </span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.location.isoState">
                                    <span class="m-widget16__date">States</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.location.isoState}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.location.isoCity">
                                    <span class="m-widget16__date">City</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.location.isoCity}}</span>
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
                                  <div class="m-widget16__item" v-if="results.location.address">
                                    <span class="m-widget16__date">Address</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.location.address}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div
                                    class="m-widget16__item"
                                    v-if="results.location.optionalAddress"
                                  >
                                    <span class="m-widget16__date">Optional Address</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.location.optionalAddress}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.location.zipCode">
                                    <span class="m-widget16__date">Zip Code</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.location.zipCode}}</span>
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
                                  <div class="m-widget16__item" v-if="results.location.namePlace">
                                    <span class="m-widget16__date">Name/Place</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.location.namePlace}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item" v-if="results.location.room">
                                    <span class="m-widget16__date">Room</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-danger"
                                    >{{results.location.room}}</span>
                                  </div>
                                  <!--end::widget item-->
                                  <!--begin::widget item-->
                                  <div class="m-widget16__item">
                                    <span class="m-widget16__date">Phone</span>
                                    <span
                                      class="m-widget16__price m--align-right m--font-brand"
                                    >{{results.contacto.phone}}</span>
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
        </div>
        <!--end::Section-->
      </div>
    </div>
    <!--end::Portlet-->
  </div>
</template>
<script>
import Flag from "../Element/Flag.vue";
export default {
  components: {
    Flag
  },
  props: ["id-assist"],
  data: function() {
    return {
      assist: this.idAssist,
      results: [],
      showLoader: false
    };
  },
  methods: {
    getAssistanceDetail: function() {
      this.showLoader = true;
      this.axios
        .post("getAssistanceDetail", {
          idAssist: this.idAssist
        })
        .then(response => {
          this.showLoader = false;
          this.results = response.data.results;
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