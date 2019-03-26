<style src="../Element/custom-m-loader.css"></style>
<template>
  <div class="col-lg-12" :class="{'m-loader m-loader--metal m-loader--div':showLoader}">
    <div class="m-portlet m-portlet--full-height">
      <div class="m-portlet__body">
        <div
          class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg"
          :id="'m_accordion_'+idAssist"
          role="tablist"
        >
          <AssistAccordion :id="'_general_'+idAssist" ico="fa flaticon-user-ok">
            <template slot="title">GENERAL INFORMATION</template>
            <template slot="body">
              <AssistAccordionDetaill>
                <template slot="title">Travel Source</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Destination</span>
                    <span class="m-widget16__price m--align-right m--font-danger">
                      <Flag :iso="results.voucher.destination"></Flag>
                    </span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.namePlan">
                    <span class="m-widget16__date">Plan</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.voucher.namePlan}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">From</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.voucher.startDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">To</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.voucher.endDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Purchase Date</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.voucher.purchaseDate}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">BENEFICIARIES</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">First Name</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.passenger.fisrtName}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Last Name</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.passenger.lastName}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.passenger.email">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.passenger.email}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.passenger.phone">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.passenger.phone}}</span>
                  </div>
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
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">OTHER INFORMATION</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Observations</span>
                  </div>
                  <div class="m-widget16__item">
                    <span>{{results.contactObservation}}</span>
                  </div>
                  <div
                    class="m-widget16__item"
                    v-if="results.voucher.contacto.name || results.voucher.contacto.email || results.voucher.contacto.phone"
                  >
                    <span class="m-widget16__amount m--align-center">Contact Emergency</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contacto.name">
                    <span class="m-widget16__date">Name</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.voucher.contacto.name}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contacto.email">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.voucher.contacto.email}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contacto.phone">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.voucher.contacto.phone}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
            </template>
          </AssistAccordion>
          <AssistAccordion :id="'_assistance_'+idAssist" ico="fa flaticon-alert-2">
            <template slot="title">ASSISTANCE DATA</template>
            <template slot="body">
              <AssistAccordionDetaill>
                <template slot="title">ASSISTANCE CONCTACT</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">First Name</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.contacto.fisrtName}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Last Name</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.contacto.lastName}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.contacto.email}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.contacto.phone}}</span>
                  </div>
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
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Genre</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.contacto.genre | genreDetaill}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">INFORMATION ASSISTANCE</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Source</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.origenAssist}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Relation</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.contacto.relation}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Case Type</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.caseType.description}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Symptoms</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.symptom.description}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Type of Coordination</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.coordination.description}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">DESCRIPTION</template>
                <template slot="body">
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
                </template>
              </AssistAccordionDetaill>
            </template>
          </AssistAccordion>
          <AssistAccordion :id="'_address_'+idAssist" ico="fa flaticon-placeholder">
            <template slot="title">ADDRESS</template>
            <template slot="body">
              <AssistAccordionDetaill>
                <template slot="title">Country</template>
                <template slot="body">
                  <div class="m-widget16__item" v-if="results.location.country.iso">
                    <span class="m-widget16__date">Country</span>
                    <span class="m-widget16__price m--align-right m--font-brand">
                      <Flag :iso="results.location.country.iso"></Flag>
                    </span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.state.description">
                    <span class="m-widget16__date">States</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.location.state.description}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.city.description">
                    <span class="m-widget16__date">City</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.location.city.description}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">Address</template>
                <template slot="body">
                  <div class="m-widget16__item" v-if="results.location.address">
                    <span class="m-widget16__date">Address</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.location.address}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.optionalAddress">
                    <span class="m-widget16__date">Optional Address</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.location.optionalAddress}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.zipCode">
                    <span class="m-widget16__date">Zip Code</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.location.zipCode}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">Name/Place</template>
                <template slot="body">
                  <div class="m-widget16__item" v-if="results.location.namePlace">
                    <span class="m-widget16__date">Name/Place</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.location.namePlace}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.room">
                    <span class="m-widget16__date">Room</span>
                    <span
                      class="m-widget16__price m--align-right m--font-danger"
                    >{{results.location.room}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right m--font-brand"
                    >{{results.contacto.phone}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
            </template>
          </AssistAccordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Flag from "../Element/Flag.vue";
import AssistAccordion from "./AssistAccordion.vue";
import AssistAccordionDetaill from "./AssistAccordionDetaill.vue";
export default {
  components: {
    Flag,
    AssistAccordion,
    AssistAccordionDetaill
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