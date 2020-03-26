<style scoped>
.options-btn {
    display: inline-flex;
}
iframe {
    height: 360px;
    width: 100%;
}
.m-messenger__message-text {
    font-weight: 400;
}
.m-messenger
    .m-messenger__messages
    .m-messenger__message.m-messenger__message--out
    .m-messenger__message-content {
    background: #36a3f7;
}
.m-messenger.m-messenger.m-messenger--message-arrow
    .m-messenger__message.m-messenger__message--out
    .m-messenger__message-arrow {
    color: #36a3f7;
}
</style>
<style src="../Element/custom-m-loader.css"></style>
<template>
    <section :class="{'m-loader m-loader--metal m-loader--div':showLoader}">
        <div class="form-group m-form__group row">
            <date-range-bt
                class-prop="col-md-4 m-form__group-sub"
                name="date"
                watermark="Select date range"
                v-on:input="setDataFilter"
                :value="filters.date"
            ></date-range-bt>
            <input-from-table
                class-prop="col-md-4 m-form__group-sub"
                name="search"
                watermark="Search"
                icon="flaticon-interface-5"
                v-on:input="setDataFilter"
                :value="filters.search"
            ></input-from-table>
            <div class="col m--align-right">
                <button class="btn btn-info" @click="clear">Clear</button>
            </div>
        </div>
        <div
            class="m-messenger m-messenger--message-arrow m-messenger--skin-light"
            v-if="noteToShow.length>0"
        >
            <div class="m-messenger__messages m-scrollable m-scroller ps ps--active-y">
                <div class="m-messenger__wrapper" v-for="note in noteToShow" :key="note.id">
                    <div
                        class="m-messenger__message"
                        :class="[isUserNote(note)?'m-messenger__message--out':'m-messenger__message--in']"
                    >
                        <div
                            class="m-messenger__message-no-pic"
                            :class="['m--bg-fill-'+colorByUser(note)]"
                            v-if="!isUserNote(note)"
                        >
                            <span>{{note.user.user | firstLetter }}</span>
                        </div>
                        <div class="m-messenger__message-body">
                            <div class="m-messenger__message-arrow"></div>
                            <div class="m-messenger__message-content">
                                <div class="m-messenger__message-username">
                                    <b>{{note.user.user}}@{{note.createdDate.date}} {{note.createdDate.hour}} | {{note.eventDetaill.description||'N/A'}}</b>
                                </div>
                                <div class="m-messenger__message-text" v-html="note.description"></div>
                            </div>
                        </div>
                        <div
                            class="m-messenger__message-no-pic"
                            :class="['m--bg-fill-'+colorByUser(note)]"
                            v-if="isUserNote(note)"
                        >
                            <span>{{note.user.user | firstLetter }}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="m-messenger__datetime">2:30PM</div> -->
            </div>
        </div>
        <div class="text-center" v-else>
            <strong
                class="btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm"
                @click="clear"
            >No records found</strong>
        </div>
    </section>
</template>
<script>
import dateRangeBt from "../Tables/filters/dateRangeBt.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
export default {
    components: { dateRangeBt, inputFromTable },
    props: ["id-assist"],
    data: function() {
        return {
            filters: {
                search: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            },
            assist: this.idAssist,
            results: [],
            showLoader: false,
            usersColor: {},
            colors: [
                "brand",
                "metal",
                "accent",
                "focus",
                "primary",
                "success",
                "info",
                "warning",
                "danger"
            ]
        };
    },
    methods: {
        getNote: function() {
            this.showLoader = true;
            this.axios
                .post("getNote", {
                    idAssist: this.assist
                })
                .then(response => {
                    this.showLoader = false;
                    this.results = response.data.RESPONSE;
                });
        },
        isUserNote(note) {
            return [6, 8].includes(parseInt(note.eventDetaill.id));
        },
        colorByUser(note) {
            var show = null;
            if (note.user.id in this.usersColor) {
                show = this.usersColor[note.user.id];
            } else {
                show = this.usersColor[note.user.id] = this.colors[
                    Math.floor(Math.random() * this.colors.length)
                ];
            }
            return show;
        },
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
        },
        clear: function() {
            this.filters = {
                search: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
        }
    },
    computed: {
        noteToShow: function() {
            let filters = this.filters;
            return this.results.filter(function(v) {
                let description = v.description
                    .replace(/(<([^>]+)>)/gi, "")
                    .toLowerCase();
                let noteDesc =
                    filters.search == ""
                        ? true
                        : new RegExp(filters.search.toLowerCase()).test(
                              description
                          );
                let endDate =
                    filters.date.endDate == ""
                        ? true
                        : v.createdDate.date <= filters.date.endDate;
                let startDate =
                    filters.date.startDate == ""
                        ? true
                        : v.createdDate.date >= filters.date.startDate;
                return noteDesc && startDate && endDate;
            });
        }
    },
    mounted() {
        this.getNote();
    }
};
</script>