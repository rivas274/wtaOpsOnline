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
iframe {
  height: 360px;
  width: 100%;
}
.options-btn {
  display: inline-flex;
}
</style>
<style>
[data-toggle="popover"] .popover-content {
  display: none;
}
.popover {
  z-index: 98;
}
.popover-body {
  overflow-y: auto;
  max-height: 400px;
}
</style>
<template>
  <div
    class="m-portlet m-portlet--full-height"
    :class="{'m-loader m-loader--metal m-loader--div':showLoader}"
  >
    <div class="m-portlet__body">
      <div
        class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg"
        :id="'m_accordion_'+idAssist"
        role="tablist"
      >
        <AssistAccordion :id="'_general_'+idAssist" ico="fa flaticon-user-ok">
          <template slot="title">VOUCHER DATA</template>
          <template slot="body">
            <AssistAccordionDetaill>
              <template slot="title">Travel Source</template>
              <template slot="body">
                <div class="m-widget16__item" v-if="assistances.voucher.source">
                  <span class="m-widget16__date">Source</span>
                  <span class="m-widget16__price m--align-right">
                    <Flag :iso="assistances.voucher.source"></Flag>
                  </span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Destination</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.voucher.destination||"N/A"}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.namePlan">
                  <span class="m-widget16__date">Plan</span>
                  <span class="m-widget16__price m--align-right">{{assistances.voucher.namePlan}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">From</span>
                  <span class="m-widget16__price m--align-right">{{assistances.voucher.startDate}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">To</span>
                  <span class="m-widget16__price m--align-right">{{assistances.voucher.endDate}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Days</span>
                  <span class="m-widget16__price m--align-right">{{assistances.voucher.days}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Purchase Date</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.voucher.purchaseDate}}</span>
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
                    v-html="assistances.passenger.fisrtName"
                  ></span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Last Name</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-html="assistances.passenger.lastName"
                  ></span>
                </div>
                <div class="m-widget16__item" v-if="assistances.passenger.email">
                  <span class="m-widget16__date">Email</span>
                  <span class="m-widget16__price m--align-right">{{assistances.passenger.email}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.passenger.phone">
                  <span class="m-widget16__date">Phone</span>
                  <span class="m-widget16__price m--align-right">{{assistances.passenger.phone}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.passenger.passport">
                  <span class="m-widget16__date">Passport No.</span>
                  <span class="m-widget16__price m--align-right">{{assistances.passenger.passport}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Date of Birth</span>
                  <span class="m-widget16__price m--align-right">{{assistances.passenger.birthDate}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Age</span>
                  <span class="m-widget16__price m--align-right">{{assistances.passenger.age}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill>
              <template slot="title">OTHER INFORMATION</template>
              <template slot="body">
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Observations</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-if="!assistances.voucher.comments.comments"
                  >N/A</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.comments.comments">
                  <span class="m-widget16__price" v-html="assistances.voucher.comments.comments"></span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Medical comments</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-if="!assistances.voucher.comments.medical"
                  >N/A</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.comments.medical">
                  <span class="m-widget16__price" v-html="assistances.voucher.comments.medical"></span>
                </div>
                <div
                  class="m-widget16__item"
                  v-if="assistances.voucher.contact.name || assistances.voucher.contact.email || assistances.voucher.contact.phone"
                >
                  <span class="m-widget16__amount m--align-center">Contact Emergency</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.contact.name">
                  <span class="m-widget16__date">Name</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.voucher.contact.name}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.contact.email">
                  <span class="m-widget16__date">Email</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.voucher.contact.email}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.voucher.contact.phone">
                  <span class="m-widget16__date">Phone</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.voucher.contact.phone}}</span>
                </div>
                <div class="m-widget16__item" v-if="benefit.SOURCE">
                  <span class="m-widget16__date">Benefit</span>
                  <span class="m-widget16__price m--align-right">
                    {{benefit.SOURCE}}
                    <pop-over
                      class-prop="btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill"
                      :placement="left"
                      :title="benefit.SOURCE + ' |   ' + (assistances.voucher.namePlan || '')"
                    >
                      <template slot="button">
                        <i class="flaticon-suitcase"></i>
                      </template>
                      <template slot="content">
                        <table align="center" class="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>
                                <strong>Name</strong>
                              </th>
                              <th>
                                <strong>Value</strong>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-for="benf in benefit.BENEFIT">
                              <tr :key="benf.id" v-if="benf.name">
                                <td v-html="benf.name"></td>
                                <td v-html="benf.valor||'N/A'"></td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </template>
                    </pop-over>
                  </span>
                </div>
              </template>
            </AssistAccordionDetaill>
          </template>
        </AssistAccordion>
        <AssistAccordion :id="'_general_conditions_'+idAssist" ico="fa flaticon-file">
          <template slot="title">GENERAL CONDITIONS</template>
          <template slot="body">
            <iframe :src="baseUrlApi()+'GeneralConditions/file/'+assistances.codeAssist"></iframe>
          </template>
        </AssistAccordion>
        <AssistAccordion :id="'_assistance_'+idAssist" ico="fa flaticon-computer">
          <template slot="title">ASSISTANCE DATA</template>
          <template slot="body">
            <AssistAccordionDetaill>
              <template slot="title">ASSISTANCE CONCTACT</template>
              <template slot="body">
                <div class="m-widget16__item">
                  <span class="m-widget16__date">First Name</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-html="assistances.contact.fisrtName"
                  ></span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Last Name</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-html="assistances.contact.lastName"
                  ></span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Email</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.email}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Phone</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.phone}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Passport No.</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.passport}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Date of Birth</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.birthDate}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Age</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.age}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Genre</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.contact.genre | genreDetaill}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill>
              <template slot="title">INFORMATION ASSISTANCE</template>
              <template slot="body">
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Opening Date</span>
                  <span class="m-widget16__price m--align-right">{{assistances.registeredDate.date}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Date Event</span>
                  <span class="m-widget16__price m--align-right">
                    {{assistances.reportedDate.date}}
                    <small>({{assistances.reportedDate.hour}})</small>
                  </span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Source</span>
                  <span class="m-widget16__price m--align-right">{{assistances.origenAssist}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Relation</span>
                  <span class="m-widget16__price m--align-right">{{assistances.contact.relation}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Case Type</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.caseType.description}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Symptoms</span>
                  <span class="m-widget16__price m--align-right">{{assistances.symptom.description}}</span>
                </div>
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Type of Coordination</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.coordination.description}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill>
              <template slot="title">DESCRIPTION</template>
              <template slot="body">
                <div class="m-widget16__item">
                  <span
                    class="m-widget16__date m--align-center"
                    v-if="assistances.contact.observations"
                    v-html="assistances.contact.observations"
                  ></span>
                  <span class="m-widget16__date m--align-center" v-else>N/A</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill v-if="Object.keys(assistances.caseTypeField).length>0">
              <template slot="title">CASE TYPE FIELDS</template>
              <template slot="body">
                <div
                  class="m-widget16__item"
                  v-for="(field,key) in assistances.caseTypeField"
                  :key="key"
                >
                  <span class="m-widget16__date">{{ field.name }}</span>
                  <span class="m-widget16__price m--align-right">{{ field.value }}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill v-if="Object.keys(assistances.insuranceField).length>0">
              <template slot="title">INSURANCE FIELDS</template>
              <template slot="body">
                <div
                  class="m-widget16__item"
                  v-for="(field,key) in assistances.insuranceField"
                  :key="key"
                >
                  <span class="m-widget16__date">{{ field.name }}</span>
                  <span class="m-widget16__price m--align-right">{{ field.value }}</span>
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
                <div class="m-widget16__item" v-if="assistances.location.country.iso">
                  <span class="m-widget16__date">Country</span>
                  <span class="m-widget16__price m--align-right">
                    <Flag :iso="assistances.location.country.iso"></Flag>
                  </span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.state.description">
                  <span class="m-widget16__date">States</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.location.state.description}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.city.description">
                  <span class="m-widget16__date">City</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.location.city.description}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill>
              <template slot="title">Address</template>
              <template slot="body">
                <div class="m-widget16__item" v-if="assistances.location.address">
                  <span class="m-widget16__date">Address</span>
                  <span
                    class="m-widget16__price m--align-right"
                    v-html="assistances.location.address"
                  ></span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.optionalAddress">
                  <span class="m-widget16__date">Optional Address</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.location.optionalAddress}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.zipCode>0">
                  <span class="m-widget16__date">Zip Code</span>
                  <span class="m-widget16__price m--align-right">{{assistances.location.zipCode}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.namePlace">
                  <span class="m-widget16__date">Name/Place</span>
                  <span class="m-widget16__price m--align-right">{{assistances.location.namePlace}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.room">
                  <span class="m-widget16__date">Room</span>
                  <span class="m-widget16__price m--align-right">{{assistances.location.room}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
            <AssistAccordionDetaill>
              <template slot="title">Contact</template>
              <template slot="body">
                <div class="m-widget16__item">
                  <span class="m-widget16__date">Phone</span>
                  <span class="m-widget16__price m--align-right">{{assistances.location.phone}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.coordinates.lat">
                  <span class="m-widget16__date">Coordinates</span>
                  <span class="m-widget16__price m--align-right">
                    <a
                      :href="'https://www.google.com/maps/@'+assistances.location.coordinates.lat+','+assistances.location.coordinates.lng+',16z'"
                      target="_blank"
                    >
                      <i class="la la-map-marker"></i>Show Map
                    </a>
                  </span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.coordinates.lat">
                  <span class="m-widget16__date">Latitud</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.location.coordinates.lat|toFixed(7)}}</span>
                </div>
                <div class="m-widget16__item" v-if="assistances.location.coordinates.lng">
                  <span class="m-widget16__date">Longitud</span>
                  <span
                    class="m-widget16__price m--align-right"
                  >{{assistances.location.coordinates.lng|toFixed(7)}}</span>
                </div>
              </template>
            </AssistAccordionDetaill>
          </template>
        </AssistAccordion>
      </div>
    </div>
  </div>
</template>
<script>
import Flag from "../Element/Flag.vue";
import AssistAccordion from "./AssistAccordion.vue";
import AssistAccordionDetaill from "./AssistAccordionDetaill.vue";
import popOver from "../Element/pop-over.vue";
export default {
  components: {
    Flag,
    AssistAccordion,
    AssistAccordionDetaill,
    popOver
  },
  props: ["id-assist"],
  data: function() {
    return {
      assist: this.idAssist,
      assistances: [],
      showLoader: false,
      benefit: []
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
          this.assistances = response.data.RESPONSE;
        });
    }
  },
  mounted() {
    this.axios
      .post("GetBenefitToCase", {
        idAssist: this.idAssist
      })
      .then(response => {
        this.benefit = response.data.RESPONSE;
        $(this.$el)
          .find('[data-toggle="popover"]')
          .popover({
            html: true,
            trigger: "focus",
            title: function() {
              return $(this).attr("title");
            },
            content: function() {
              return $(this)
                .find(".popover-content")
                .html();
            }
          });
      });
    this.getAssistanceDetail();
  }
};
</script>
