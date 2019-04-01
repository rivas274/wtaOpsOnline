<style src="../Element/custom-m-loader.css"></style>
<style scoped>
.m-widget16__price {
  word-break: break-word;
}
.m-widget16__item:nth-child(odd) {
    color: #716aca !important;
}
.m-widget16__item:nth-child(even) {
    color: #34bfa3 !important;
}
</style>

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
                    <span class="m-widget16__date">Source</span>
                    <span class="m-widget16__price m--align-right">
                      <Flag :iso="results.voucher.source"></Flag>
                    </span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Destination</span>
                    <span class="m-widget16__price m--align-right">
                      {{results.voucher.destination}}
                    </span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.namePlan">
                    <span class="m-widget16__date">Plan</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.namePlan}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">From</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.startDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">To</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.endDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Days</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.days}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Purchase Date</span>
                    <span
                      class="m-widget16__price m--align-right"
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
                      class="m-widget16__price m--align-right"
                      v-html="results.passenger.fisrtName"
                    ></span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Last Name</span>
                    <span
                      class="m-widget16__price m--align-right"
                      v-html="results.passenger.lastName"
                    ></span>
                  </div>
                  <div class="m-widget16__item" v-if="results.passenger.email">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.passenger.email}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.passenger.phone">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.passenger.phone}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.passenger.passport">
                    <span class="m-widget16__date">Passport No.</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.passenger.passport}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Date of Birth</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.passenger.birthDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Age</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.passenger.age}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">OTHER INFORMATION</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Observations</span>
                    <span class="m-widget16__price m--align-right" v-if="!results.voucher.comments.comments">N/A</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.comments.comments">
                    <span class="m-widget16__price" v-html="results.voucher.comments.comments"></span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Medical comments</span>
                    <span class="m-widget16__price m--align-right" v-if="!results.voucher.comments.medical">N/A</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.comments.medical">
                    <span class="m-widget16__price" v-html="results.voucher.comments.medical"></span>
                  </div>
                  <div
                    class="m-widget16__item"
                    v-if="results.voucher.contact.name || results.voucher.contact.email || results.voucher.contact.phone"
                  >
                    <span class="m-widget16__amount m--align-center">Contact Emergency</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contact.name">
                    <span class="m-widget16__date">Name</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.contact.name}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contact.email">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.contact.email}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.voucher.contact.phone">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.voucher.contact.phone}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Conditioned</span>
                    <span class="m-widget16__price m--align-right">
                      <a
                        :href="baseUrlApi()+'conditioned/'+results.codeAssist"
                        target="_blank"
                      ><i class="fa fa-file-pdf fa-lg"></i> Show</a>
                    </span>
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
                      class="m-widget16__price m--align-right"
                      v-html="results.contact.fisrtName"
                    ></span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Last Name</span>
                    <span
                      class="m-widget16__price m--align-right"
                      v-html="results.contact.lastName"
                    ></span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Email</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.email}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.phone}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Passport No.</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.passport}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Date of Birth</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.birthDate}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Age</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.age}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Genre</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.genre | genreDetaill}}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill>
                <template slot="title">INFORMATION ASSISTANCE</template>
                <template slot="body">
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Source</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.origenAssist}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Relation</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.contact.relation}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Case Type</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.caseType.description}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Symptoms</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.symptom.description}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Type of Coordination</span>
                    <span
                      class="m-widget16__price m--align-right"
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
                      v-if="results.contact.observations"
                      v-html="results.contact.observations"
                    ></span>
                    <span
                      class="m-widget16__date m--align-center"
                      v-else
                    >N/A</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill v-if="Object.keys(results.caseTypeField).length>0">
                <template slot="title">CASE TYPE FIELDS</template>
                <template slot="body">
                  <div class="m-widget16__item" v-for="(field,key) in results.caseTypeField" :key="key">
                    <span class="m-widget16__date">{{ field.name }}</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{ field.value }}</span>
                  </div>
                </template>
              </AssistAccordionDetaill>
              <AssistAccordionDetaill v-if="Object.keys(results.insuranceField).length>0">
                <template slot="title">INSURANCE FIELDS</template>
                <template slot="body">
                  <div class="m-widget16__item" v-for="(field,key) in results.insuranceField" :key="key">
                    <span class="m-widget16__date">{{ field.name }}</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{ field.value }}</span>
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
                    <span class="m-widget16__price m--align-right">
                      <Flag :iso="results.location.country.iso"></Flag>
                    </span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.state.description">
                    <span class="m-widget16__date">States</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.location.state.description}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.city.description">
                    <span class="m-widget16__date">City</span>
                    <span
                      class="m-widget16__price m--align-right"
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
                      class="m-widget16__price m--align-right"
                      v-html="results.location.address"
                    ></span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.optionalAddress">
                    <span class="m-widget16__date">Optional Address</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.location.optionalAddress}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.zipCode>0">
                    <span class="m-widget16__date">Zip Code</span>
                    <span
                      class="m-widget16__price m--align-right"
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
                      class="m-widget16__price m--align-right"
                    >{{results.location.namePlace}}</span>
                  </div>
                  <div class="m-widget16__item" v-if="results.location.room">
                    <span class="m-widget16__date">Room</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.location.room}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Phone</span>
                    <span
                      class="m-widget16__price m--align-right"
                    >{{results.location.phone}}</span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Coordinates</span>
                    <span class="m-widget16__price m--align-right">
                      <a
                        :href="'https://www.google.com/maps/@'+results.location.coordinates.lat+','+results.location.coordinates.lng+',16z'"
                        target="_blank"
                      ><i class="la la-map-marker"></i>Show Map</a>
                    </span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Latitud</span>
                    <span class="m-widget16__price m--align-right">
                      {{results.location.coordinates.lat|toFixed(7)}}
                    </span>
                  </div>
                  <div class="m-widget16__item">
                    <span class="m-widget16__date">Longitud</span>
                    <span class="m-widget16__price m--align-right">
                      {{results.location.coordinates.lng|toFixed(7)}}
                    </span>
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