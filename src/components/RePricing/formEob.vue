<template>
    <div class="col-md-12">
        <form class="m-form col-md-12 add-form-eob"
        @submit.prevent="validFormEOB"
        method="POST"
        ref="form">
            <div class="form-group text-center">
                <strong>Clain Information</strong>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong >Date of Claim</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.dateClaim" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Claim Received Date</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.claimReceivedDate" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Date of service - DOS</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.dateServiceDOS" disabled />
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong>Date of EOB</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.dateEOB" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>ICN</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.ICN" disabled />
                </div>
            </div>

            <div class="form-group text-center">
                <strong>Patient Information</strong>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong>Patient Name</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.patientName" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Patient DOB</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.patientDOB" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Case #</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.patientDOB" disabled />
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong>Policy Name</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.policyName" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Patient Acc. #</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.patientAcc" disabled />
                </div>
            </div>

            <div class="form-group text-center">
                <strong>Provider Information</strong>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong>Provider Name</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.providerName" disabled />
                </div>
                <div class="form-group col-md-4">
                    <strong>Provider Address</strong>
                    <textarea class="form-control m-input" v-model="inputsData.providerAddress" disabled></textarea>
                </div>
                <div class="form-group col-md-4">
                    <strong>Federal Tax ID</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.providerTaxID" disabled />
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <strong>NPI</strong>
                    <input type="text" class="form-control m-input" v-model="inputsData.providerNPI" disabled />
                </div>
            </div>

            <div class="form-group"></div>

            <div class="row">
                <div class="form-group col-md-4">
                    <strong>DOS</strong>
                    <date-single-bt
                        class-prop="m-input"
                        name="dos"
                        :value="inputsData.dos"
                        v-on:input="setDataFilter"
                    ></date-single-bt>
                    <!--<form-error :attribute_name="'dos'" :errors_form="errors"></form-error>-->
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('procedure_code')}">
                    <strong>Procedure Code</strong>
                    <input type="text" name="procedure_code" v-validate="'required'" v-model="inputsData.procedureCode" class="form-control m-input" />
                    <form-error :attribute_name="'procedure_code'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('quantity')}">
                    <strong>Quantity</strong>
                    <input type="text" name="quantity" v-validate="'required'" v-model="inputsData.quantity" class="form-control m-input" />
                    <form-error :attribute_name="'quantity'" :errors_form="errors"></form-error>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('billed_amount')}">
                    <strong>Billed Amount</strong>
                    <input type="text" name="billed_amount" v-validate="'required'" v-model="inputsData.billedAmount" class="form-control m-input" />
                    <form-error :attribute_name="'billed_amount'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('allowable_amount')}">
                    <strong>U&C Allowable Amount</strong>
                    <input type="text" name="allowable_amount" v-validate="'required'" v-model="inputsData.allowableAmount" class="form-control m-input" />
                    <form-error :attribute_name="'allowable_amount'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('nonCovered_mount')}">
                    <strong>Non-Covered Amount</strong>
                    <input type="text" name="nonCovered_mount" v-validate="'required'" v-model="inputsData.nonCoveredAmount" class="form-control m-input" />
                    <form-error :attribute_name="'nonCovered_mount'" :errors_form="errors"></form-error>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('patient_deductible')}">
                    <strong>Patient Deductible</strong>
                    <input type="text" name="patient_deductible" v-validate="'required'" v-model="inputsData.patientDeductible" class="form-control m-input" />
                    <form-error :attribute_name="'patient_deductible'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('amount_paid')}">
                    <strong>Amount Paid</strong>
                    <input type="text" name="amount_paid" v-validate="'required'" v-model="inputsData.amountPaid" class="form-control m-input" />
                    <form-error :attribute_name="'amount_paid'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('patient_responsibility')}">
                    <strong>Patient Responsibility</strong>
                    <input type="text" name="patient_responsibility" v-validate="'required'" v-model="inputsData.patientResponsibility" class="form-control m-input" />
                    <form-error :attribute_name="'patient_responsibility'" :errors_form="errors"></form-error>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4" :class="{'has-danger': errors.has('code')}">
                    <strong>Code</strong>
                    <select-from-table
                        name="code"
                        :options="codes"
                        :selected="inputsData.code|| ''"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                    <!--<input type="text" name="code" v-validate="'required'" v-model="inputsData.code" class="form-control m-input" />-->
                    <form-error :attribute_name="'code'" :errors_form="errors"></form-error>
                </div>
            </div>
            <button
                :disabled="disableForm"
                :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                type="submit"
                class="btn btn-primary col-md-12 mt-3"
            >Send</button>
        </form>
    </div>
</template>

<script>
import FormError from "../FormError";
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";

export default {
    props: ['rePricingId'],
    components: {
        FormError,
        customImg,
        selectFromTable,
        dateSingleBt,
        localeChanger
    },
    data() {
        return {
            dataEOB: {},
            inputsData: {
                dateClaim: "",
                claimReceivedDate: "",
                dateServiceDOS: "",
                dateEOB: "",
                ICN: "",
                patientName: "",
                patientDOB: "",
                caseNumber: "",
                policyName: "",
                patientAcc: "",
                providerName: "",
                providerAddress: "",
                providerTaxID: "",
                providerNPI: "",
                dos: "",
                procedureCode: "",
                quantity: "",
                billedAmount: "",
                allowableAmount: "",
                nonCoveredAmount: "",
                patientDeductible: "",
                amountPaid: "",
                patientResponsibility: "",
                code: ""
            },
            disableForm: false,
            codes: [
                { id: "", name: 'Select Code' },
                { id: '1', name: 'AW - 1' },
                { id: '2', name: 'AW - 2' },
                { id: '3', name: 'AW - 3' },
                { id: '4', name: 'AW - 4' },
                { id: '5', name: 'AW - 5' },
                { id: '6', name: 'AW - 6' },
                { id: '7', name: 'AW - 7' },
                { id: '8', name: 'AW - 8' },
                { id: '9', name: 'AW - 9' },
                { id: '10', name: 'AW - 10' },
                { id: '11', name: 'AW - 11' }
            ]
        }
    },
    mounted() {
        this.dataFomEOB();
    },
    methods: {
        dataFomEOB: function(){
            this.axios
                .post("getDataFomEOB", {
                    rePricingId: this.rePricingId
                })
                .then(response => {
                    if (response.data.STATUS == 'OK') {
                        this.dataEOB = response.data.RESPONSE.RESULTS[0];

                        this.inputsData.dateClaim = this.dataEOB.date_invoice;
                        this.inputsData.claimReceivedDate = '';
                        this.inputsData.dateServiceDOS = '';
                        this.inputsData.dateEOB = '';
                        this.inputsData.ICN = this.dataEOB.ICN;
                        this.inputsData.patientName = this.dataEOB.first_name+' '+this.dataEOB.last_name;
                        this.inputsData.patientDOB = this.dataEOB.birthdate;
                        this.inputsData.caseNumber = this.dataEOB.codigo_asistencia;
                        this.inputsData.policyName = this.dataEOB.client;
                        this.inputsData.patientAcc = this.dataEOB.passport;
                        this.inputsData.providerName = this.dataEOB.name_provider;
                        this.inputsData.providerAddress = this.dataEOB.billto;
                        this.inputsData.providerTaxID = this.dataEOB.tax_id;
                        this.inputsData.providerNPI = this.dataEOB.NPI;
                    }
                });
        },
        validFormEOB: function() {
            if (!this.disableForm) {
                window.console.log(this.inputsData.dos);
                this.$validator.validateAll().then(result => {
                    let formData = new FormData();
                    formData.append("dos", this.inputsData.dos);
                    formData.append("procedure_code", this.inputsData.procedureCode);
                    formData.append("quantity", this.inputsData.quantity);
                    formData.append("billed_amount", this.inputsData.billedAmount);
                    formData.append("allowable_amount", this.inputsData.allowableAmount);
                    formData.append("nonCovered_amount", this.inputsData.nonCoveredAmount);
                    formData.append("patient_deductible", this.inputsData.patientDeductible);
                    formData.append("amount_paid", this.inputsData.amountPaid);
                    formData.append("patient_responsibility", this.inputsData.patientResponsibility);
                    formData.append("code", this.inputsData.code);
                    formData.append("repricing_id", this.rePricingId);
                    formData.append("userID", this.$session.get("idUser"));

                    if (result) {
                        this.disableForm = true;
                        this.axios.post("addFormEOB", formData)
                            .then(response => {
                                this.disableForm = false;
                                window.console.log(response);
                                if (response.data.STATUS == "OK") {
                                    this.inputsData.dos = '';
                                    this.inputsData.procedureCode = '';
                                    this.inputsData.quantity = '';
                                    this.inputsData.billedAmount = '';
                                    this.inputsData.allowableAmount = '';
                                    this.inputsData.nonCoveredAmount = '';
                                    this.inputsData.patientDeductible = '';
                                    this.inputsData.amountPaid = '';
                                    this.inputsData.patientResponsibility = '';
                                    this.inputsData.code = '';

                                    this.$emit("addFormEOB", response.data.RESPONSE);
                                    window.Swal.fire({
                                        title: "Send",
                                        text: 'Success',
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: "Ok"
                                    });
                                } else {
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                        }
                                    }
                                    window.Swal.fire({
                                        title: response.data.MESSAGE||"Error Form",
                                        type: "error"
                                    });
                                }
                            });
                    }
                });
            }
        },
        setDataFilter: function(campo, value) {
            this.inputsData[campo] = value;
        },
    }
}
</script>

<style>
.col-md-6, .col-md-9 {
    display: inline-block !important;
}
</style>