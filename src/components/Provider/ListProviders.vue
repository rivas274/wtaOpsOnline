<style scoped>
.options-btn {
  display: inline-flex;
}
iframe {
  height: 360px;
  width: 100%;
}
</style>

<template>
  <TableBasic :show-loader="showLoader">
    <template slot="thead">
      <tr>
        <th>
          <span>ID</span>
        </th>
        <th>
          <span>Email</span>
        </th>
        <th>
          <span>Phone</span>
        </th>
        <th>
          <span>Priority</span>
        </th>
        <th>
          <span>Country</span>
        </th>
        <th>
          <span>State</span>
        </th>
        <th>
          <span>Note</span>
        </th>
        <th>
          <span>Authorization</span>
        </th>
        <th>
          <span>Asign</span>
        </th>
      </tr>
    </template>
    <template slot="tbody">
      <template v-for="provider in results">
        <tr :key="provider.id">
          <td>
            <span>{{provider.locality.name}}</span>
          </td>
          <td>
            <span>{{provider.provider.email||'N/A'}}</span>
          </td>
          <td>
            <span>{{provider.locality.phone||'N/A'}}</span>
          </td>
          <td class="text-center">
            <priority-number>{{provider.locality.priority||0}}</priority-number>
          </td>
          <td>
            <Flag :iso="provider.locality.location.country.iso"></Flag>
          </td>
          <td>
            <span>{{provider.locality.location.state.description||'N/A'}}</span>
          </td>
          <td class="text-center">
            <pop-over v-if="provider.provider.publicNote" title="Public Note">
              <template slot="button">
                <i class="fa fa-info-circle fa-2x text-info" v-tooltip:top="'Public Note'"></i>
              </template>
              <template slot="content">
                <div v-html="provider.provider.publicNote"></div>
              </template>
            </pop-over>
            <i v-else class="fa fa-info-circle fa-2x text-dark"></i>
          </td>
          <td class="text-center">
            <i
              v-if="provider.locality.autorization=='1'"
              class="fa fa-ban text-danger fa-2x"
              v-tooltip:top="'No'"
            ></i>
            <i v-else class="fa fa-arrow-alt-circle-right text-info fa-2x" v-tooltip:top="'Yes'"></i>
          </td>
          <td>
            <button
              class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
              v-if="provider.providerAssist.paymentType"
              v-tooltip:top="provider.providerAssist.paymentType.description"
              @click="togleProvider(provider.providerAssist)"
            >
              <i
                class="fa fa-2x"
                :class="[paymentIcon(provider.providerAssist.paymentType.prefix)]"
              ></i>
            </button>
            <i v-else class="fa fa-ban text-danger fa-2x" v-tooltip:top="'No'"></i>
          </td>
        </tr>
        <tr :key="provider.providerAssist.id+'wrap'"></tr>
        <tr :key="provider.providerAssist.id+'payment'" v-show="checkVisibility(provider.providerAssist)">
          <td class="text-center" colspan="9">
            <table class="table" v-if="provider.providerAssist.paymentType">
              <thead>
                <tr>
                  <th>
                    <span>Payment Form</span>
                  </th>
                  <th>
                    <span>language</span>
                  </th>
                  <th>
                    <span>Documents</span>
                  </th>
                  <th>
                    <span>Reserve Price</span>
                  </th>
                  <th>
                    <span>Booking Text</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{{provider.providerAssist.paymentType.description}}</span>
                  </td>
                  <td>
                    <span>{{provider.providerAssist.lang}}</span>
                  </td>
                  <td>
                    <template v-for="(doc,index) in provider.providerAssist.document">
                      <span v-if="doc!==''" :key="index">| {{doc}}</span>
                    </template>
                  </td>
                  <td>
                    <span>{{provider.providerAssist.reserved.price | currency(provider.providerAssist.reserved.currency||'USD') }}</span>
                  </td>
                  <td>
                    <span>{{ provider.provider.bookingText }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </template>
    </template>
    <template slot="footer">
      <pagination
        :start="footerTable.start"
        :limit="footerTable.limit"
        :size="footerTable.size"
        v-on:paginate="setDataPaginate"
      ></pagination>
    </template>
  </TableBasic>
</template>
<script>
import pagination from "../pagination/pagination.vue";
import TableBasic from "../Tables/TableBasic.vue";
import Flag from "../Element/Flag.vue";
import popOver from "../Element/pop-over.vue";
import priorityNumber from "../Element/priority-number.vue";
export default {
  components: {
    TableBasic,
    pagination,
    Flag,
    popOver,
    priorityNumber
  },
  props: ["id-assist"],
  data: function() {
    return {
      assist: this.idAssist,
      results: [],
      footerTable: {
        start: 0,
        limit: 15,
        size: 0
      },
      showLoader: false,
      view: []
    };
  },
  methods: {
    getProviders: function(pg) {
      pg = Number.isInteger(pg) ? pg : this.footerTable.start;
      this.showLoader = true;
      this.axios
        .post("getProviderAssist", {
          start: pg,
          limit: this.footerTable.limit,
          idAssist: this.assist
        })
        .then(response => {
          this.showLoader = false;
          this.results = response.data.RESPONSE.RESULTS;
          this.footerTable = {
            start: response.data.start,
            limit: response.data.limit,
            size: response.data.size
          };
        });
    },
    setDataPaginate: function(campo, value) {
      this.footerTable[campo] = value;
      this.getProviders();
    },
    providerStatusColor(status) {
      let colors = {
        1: "m-badge--accent",
        2: "m-badge--success",
        3: "m-badge--danger",
        4: "m-badge--warning",
        5: "m-badge--focus"
      };
      return colors[status];
    },
    paymentIcon(status) {
      let ico = {
        gop: "fa-donate text-success",
        cc: "fa-credit-card text-info",
        rb: "fa-exchange-alt"
      };
      return ico[status];
    },
    checkVisibility({ id }) {
      return (
        this.view.filter(function(v) {
          console.log('validate',v,id);
          return v == id;
        }).length != 0
      );
    },
    togleProvider: function({ id }) {
      let tab = this.view.filter(function(v) {
        return v == id;
      });
      if (tab.length == 0) {
        this.view.push(id);
      } else {
        this.view = this.view.filter(function(v) {
          return v != id;
        });
      }
    }
  },
  mounted() {
    this.getProviders();
  }
};
</script>