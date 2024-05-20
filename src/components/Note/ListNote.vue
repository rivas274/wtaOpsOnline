<style>
.m-messenger__message-text {
    font-weight: 400;
}
</style>
<style src="../Element/custom-m-loader.css"></style>
<template>
    <section :class="{ 'm-loader m-loader--metal m-loader--div': showLoader }">
        <form class="m-form m--align-right" role="form" v-if="canAdd" @submit.prevent="addNote">
            <div class="form-group">
                <textarea name="description" cols="30" rows="3" class="form-control m-input"
                    :placeholder="$t('assistance.addNote')" autocomplete="off" v-validate="'required|min:1|max:5000'"
                    v-model="description" ref="description"></textarea>
                <form-error :attribute_name="'description'" :errors_form="errors"></form-error>
            </div>
            <button type="submit" class="btn btn-primary pull-end">{{ $t('general.save') }}</button>
            <hr>
        </form>
        <div class="form-group m-form__group row">
            <date-range-bt class="col-md-4 m-form__group-sub" name="date" :watermark="$t('general.selectDateRange')"
                v-on:input="setDataFilter" :value="filters.date"></date-range-bt>
            <input-from-table class="col-md-4 m-form__group-sub" name="search" :watermark="$t('general.search')"
                icon="flaticon-interface-5" v-on:input="setDataFilter" :value="filters.search"></input-from-table>
            <div class="col m--align-right">
                <button class="btn btn-outline-info" @click="clear">{{ $t('general.clear') }}</button>
            </div>
        </div>
        <div class="m-messenger m-messenger--message-arrow m-messenger--skin-light" v-if="noteToShow.length > 0">
            <div class="m-messenger__messages m-scrollable m-scroller ps ps--active-y">
                <div class="m-messenger__wrapper" v-for="note in noteToShow" :key="type + note.id">
                    <div class="m-messenger__message"
                        :class="[note.isUserNote ? 'm-messenger__message--out' : 'm-messenger__message--in']">
                        <div class="m-messenger__message-no-pic" :class="['m--bg-fill-' + note.color]"
                            v-if="!note.isUserNote">
                            <span v-if="!('displayAuditor' in note)">{{ note.user.user | firstLetter }}</span>
                        </div>
                        <div class="m-messenger__message-body">
                            <div class="m-messenger__message-arrow" :class="['m--font-' + note.color]"></div>
                            <div class="m-messenger__message-content" :class="['m--bg-fill-' + note.color]">
                                <div class="m-messenger__message-username" :class="['m--font-inverse-'+note.color]" v-if="!('displayAuditor' in note)">
                                    <b>{{ note.user.user }}@{{ note.createdDate.date }} {{ note.createdDate.hour }} |
                                        {{ note.eventDetaill.description || $t('general.notLoaded') }}</b>
                                </div>
                                <div class="m-messenger__message-text" :class="['m--font-inverse-'+note.color]" v-html="note.description"></div>
                            </div>
                        </div>
                        <div class="m-messenger__message-no-pic" :class="['m--bg-fill-' + note.color]"
                            v-if="note.isUserNote">
                            <span v-if="!('displayAuditor' in note)">{{ note.user.user | firstLetter }}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="m-messenger__datetime">2:30PM</div> -->
            </div>
        </div>
        <div class="text-center" v-else>
            <h1 class="btn btn-outline-danger m-btn m-btn--pill m-btn--wide" @click="clear">{{ $t('general.noRecordsFound') }}
            </h1>
        </div>
    </section>
</template>
<script>
import dateRangeBt from "../Tables/filters/dateRangeBt.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
export default {
    components: { dateRangeBt, inputFromTable },
    props: ["id-assist", "type", "can-add"],
    data: function () {
        return {
            filters: {
                search: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            },
            description: '',
            results: [],
            showLoader: false,
            usersColor: {},
            interval: null
        };
    },
    methods: {
        getNote: function () {
            this.showLoader = true;
            this.axios
                .post("getNote", {
                    idAssist: this.idAssist,
                    type: this.type
                })
                .then(response => {
                    this.showLoader = false;
                    this.results = response.data.RESPONSE;
                });
        },
        isUserNote(note) {
            if (this.canAdd) {
                if (note.user) {
                    return note.user.id == this.$session.get("idUser");
                }
            }
            return [6, 8].includes(parseInt(note.eventDetaill.id));
        },
        setDataFilter: function (campo, value) {
            this.filters[campo] = value;
        },
        clear: function () {
            this.filters = {
                search: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
        },
        addNote: function () {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addNote", {
                                description: this.description,
                                idAssist: this.idAssist,
                                type: this.type,
                            })
                            .then(() => {
                                this.disableForm = false;
                                this.description = '';
                                this.getNote();
                            });
                    }
                });
            }
        },
    },
    computed: {
        noteToShow: function () {
            let filters = this.filters;
            return this.results.filter(function (v) {
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
            }).map(value =>{
                return {
                    ...value,
                    isUserNote: this.isUserNote(value),
                    color:this.isUserNote(value)?'primary':'info'
                };
            })
        }
    },
    mounted() {
        this.getNote();
        this.interval = setInterval(this.getNote, 0.5 * 60 * 1000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
        this.interval = this.interval = null;
    },
};
</script>