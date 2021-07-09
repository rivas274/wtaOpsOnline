<template>
    <form class="m-form col-md-12 add-repriced-eob"
        @submit.prevent="validRepricedEOB"
        enctype="multipart/form-data"
        method="POST">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group" v-if="rePricingDetaill.rePricing.files.EOB && this.nameEob">
                    <strong>EOB ID</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            class="form-control m-input"
                            placeholder="EOB ID"
                            v-validate="'required'"
                            v-model.lazy="rePricingDetaill.rePricing.files.EOB"
                            ref="EOB_ID"
                            disabled
                        />
                        <span class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-tag"></i>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('fileEob')}">
                
                    <strong>Repriced EOB</strong>
                    <div class="custom-file" v-if="rePricingDetaill.rePricing.files.EOB && this.nameEob && !this.fileEOB">
                        <input
                            type="file"
                            name="fileEob"
                            class="custom-file-input"
                            id="fileEob"
                            accept="application/pdf"
                            v-validate="'ext:pdf'"
                            ref="fileEob"
                            v-on:change="handleFileUploadEOB()"
                        />
                        <label
                            class="custom-file-label"
                            :class="['custom-file-'+$root.$i18n.locale]"
                            for="fileEob"
                        >{{ this.nameEob }}</label>
                    </div>
                    <div class="custom-file" v-else>
                        <input
                            type="file"
                            name="fileEob"
                            class="custom-file-input"
                            id="fileEob"
                            accept="application/pdf"
                            v-validate="this.requiredEOB+'|ext:pdf'"
                            ref="fileEob"
                            v-on:change="handleFileUploadEOB()"
                        />
                        <label
                            class="custom-file-label"
                            :class="['custom-file-'+$root.$i18n.locale]"
                            for="fileEob"
                        >{{(typeof fileEOB =='object' && 'name' in fileEOB)?fileEOB.name:$t('document.choose')}}</label>
                    </div>
                    <div class="progress" v-if="uploadPercentage>0">
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            :aria-valuenow="uploadPercentage"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{width: uploadPercentage+'%'}"
                        ></div>
                    </div>
                    <form-error :attribute_name="'fileEob'" :errors_form="errors"></form-error>
                </div>
                <button
                    :disabled="disableForm"
                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                    type="submit"
                    class="btn btn-primary col-md-12 mt-3"
                >{{$t('general.send')}}</button>
            </div>
            <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                <iframe
                    class="preview"
                    v-if="rePricingDetaill.rePricing.files.EOB && this.nameEob && !previewEOB"
                    :src="baseUrlApi()+'streaming/'+rePricingDetaill.rePricing.files.EOB"
                ></iframe>
                <h1 v-if="!previewEOB && !this.nameEob" class="m-auto d-none d-md-block">Preview</h1>
                <iframe class="preview rounded h-100 w-100" v-if="previewEOB" :src="previewEOB" />
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: ['rePricingDetaill'],
    data() {
        return {
            fileEOB: "",
            nameEob: "",
            fileNames: {},
            EobID: this.rePricingDetaill.rePricing.files.EOB,
            reference: '',
            disableForm:false,
            uploadPercentage:0
        }
    },
    mounted() {
        this.getFileNames();
    },
    methods: {
        validRepricedEOB: function() {
            if (!this.disableForm) {
                
                let formData = new FormData();
                formData.append("fileEob", this.fileEOB);
                formData.append("userID", this.$session.get("idUser"));
                formData.append("user", this.$session.get("user"));
                formData.append("repricingId", this.rePricingDetaill.rePricing.id);
                formData.append("nameEob", this.nameEob);
                formData.append("assistanceId", this.rePricingDetaill.rePricing.assist.id);
                formData.append("assistanceCode", this.rePricingDetaill.rePricing.assist.code);
                formData.append("providerRepricingId", this.rePricingDetaill.rePricing.providerRepricing);
                formData.append("reference", this.rePricingDetaill.invoice.ref);
                formData.append("provider_name", this.rePricingDetaill.providerAssist.name);

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    onUploadProgress: function(progressEvent) {
                        this.uploadPercentage = parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        );
                    }.bind(this)
                }

                this.disableForm = true;
                this.axios.post("addFilesRepricing", formData, config)
                    .then(response => {
                        this.disableForm = false;
                        if (response.data.STATUS == "OK") {
                            this.$emit("addFilesRepricing", response.data.RESPONSE);
                            window.Swal.fire({
                                title: this.$t("general.sent"),
                                text: this.$t("document.uploaded"),
                                type: "success",
                                showCancelButton: true,
                                confirmButtonText: this.$t("general.ok"),
                                cancelButtonText: this.$t("general.no")
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
                                confirmButtonText: this.$t("general.ok"),
                                type: "error"
                            });
                        }
                        this.uploadPercentage = 0;
                    });
            }
        },
        handleFileUploadEOB: function() {
            this.fileEOB = this.$refs.fileEob.files[0];
        },
        getFileNames: function(){
            this.axios
                .post("fileNames", {
                    EobID: this.EobID
                })
                .then(response => {
                    this.fileNames = response.data.RESPONSE;

                    if (this.fileNames !== 'ERROR') {
                        this.fileNames.forEach(element => {
                            if (element.category == '47') {
                                this.nameFee = element.FileName;
                                this.inputsData.date = element.dateInvoice;
                            }
                            if (element.category == '20') {
                                this.nameEob = element.FileName;
                            }
                        });
                    }
                });
        }
    },
    computed: {
        previewEOB: function() {
            if (!this.fileEOB || this.errors.has("fileEob")) {
                return false;
            }
            return URL.createObjectURL(this.fileEOB);
        },
    }
}
</script>