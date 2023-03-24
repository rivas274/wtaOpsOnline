<template>
    <div>
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text" v-if="show == 'instruction' && 'title' in instructionOfUse">
                        {{instructionOfUse.title}}
                    </h3>
                    <h3 class="m-portlet__head-text" v-else-if="'title' in declarationOfUse">
                        {{declarationOfUse.title}}
                    </h3>
                </div>
            </div>
        </div>
        <div v-if="show == 'instruction'">
            <div class="m-portlet__body pb-3">
                <div class="row">
                    <div class="col-md-12 declaration-of-use text-justify" v-html="instructionOfUse.description"></div>
                </div>
            </div>
            <div class="m-portlet__foot text-center">
                <div class="m-form__actions">
                    <button
                            :disabled="disableForm"
                            :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                            type="submit"
                            class="btn btn-primary"
                            @click="$emit('update:accepted','Y')"
                    >{{ $t('general.continue') }}</button>
                </div>
            </div>
        </div>
        <form @submit.prevent="saveDeclaration" v-else-if="'description' in declarationOfUse">
            <div class="m-portlet__body pb-3">
                <div class="row">
                    <div class="col-md-12 declaration-of-use text-justify" v-html="declarationOfUse.description"></div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="form-group m-form__group m-0" :class="{'has-danger': errors.has('nameBenefit')}">
                        <input-from-table
                            class="m-form__group-sub"
                            :watermark="$t('general.name')"
                            v-validate="'required|min:4|max:50'"
                            :data-vv-as="$t('general.name')"
                            icon="flaticon-lifebuoy"
                            name="nameBenefit"
                            v-on:input="setData"
                            :value="nameBenefit"
                        ></input-from-table>
                        <form-error
                            :attribute_name="'nameBenefit'"
                            :errors_form="errors"
                        ></form-error>
                    </div>
                </div>
            </div>
            <div class="m-portlet__foot text-center">
                <div class="m-form__actions">
                    <button
                            :disabled="disableForm"
                            :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                            type="submit"
                            class="btn btn-primary"
                        >{{ $t('general.ok') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import FormError from "../FormError";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
export default {
    components: {
        FormError,
        inputFromTable,
    },
    props:['idAssist','accepted'],
    data() {
        return {
            declaration: {},
            instruction: {},
            disableForm: false,
            nameBenefit: '',
            show:'declaration'
        };
    },
    mounted() {
        this.getContents();
    },
    methods: {
        setData: function (item,value) {
            this[item] = value;
        },
        getContents: function () {
            this.axios.get("getDeclarationOfUseRefund").then(response => {
                this.declaration = response.data.RESPONSE;
            });
            this.axios.get("getInstructionsRefund").then(response => {
                this.instruction = response.data.RESPONSE;
            });
        },
        saveDeclaration: function () {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("acceptDeclarationOfUseRefund", {
                                idAssist:this.idAssist,
                                nameBenefit:this.nameBenefit
                            })
                            .then(response => {
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.show = 'instruction';
                                } else {
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                        }
                                    }
                                }
                                this.uploadPercentage = 0;
                            });
                    }
                });
            }
        }
    },
    computed: {
        declarationOfUse: function () {
            return this.declaration[this.$root.$i18n.locale]||{};
        },
        instructionOfUse: function () {
            return this.instruction[this.$root.$i18n.locale]||{};
        }
    }
};
</script>
<style scoped>
.declaration-of-use{
    font-size: 17px;
}
</style>