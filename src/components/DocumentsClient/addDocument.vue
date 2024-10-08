<template>
    <div>
        <div class="row mx-0">
            <form
                class="m-form col-md-6"
                @submit.prevent="validDocument"
                enctype="multipart/form-data"
                ref="form">
                <div class="form-group m-form__group" :class="{'has-danger': errors.has('Description')}">
                    <strong>{{ $t('document.description') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <textarea
                            name="Description"
                            class="form-control m-input"
                            :placeholder="$t('document.description')"
                            :data-vv-as="$t('document.description')"
                            v-validate="'required|min:2|max:255|'"
                            v-model="inputsData.description"
                            ref="Description"
                        ></textarea>
                        <span class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-pencil-square-o"></i>
                            </span>
                        </span>
                    </div>
                    <form-error :attribute_name="'Description'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group m-form__group" 
                    :class="{'has-danger': errors.has('Description')}"
                    v-if="clients.length>1">
                    <strong>{{ $t('assistance.clients') }}</strong>
                    <select-from-table
                        name="prefijo"
                        :watermark="$t('assistance.clients')"
                        :options="clients"
                        :selected="inputsData.prefijo"
                        v-on:input="setDataFilter"
                        v-validate="'required'"
                        :data-vv-as="$t('assistance.clients')">
                    </select-from-table>
                    <form-error :attribute_name="'prefijo'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('file')}" >
                    <strong>{{ $t('document.file') }}</strong>
                    <div class="custom-file">
                        <input
                            type="file"
                            name="file"
                            class="custom-file-input"
                            id="file"
                            accept=".pdf,.gif,.jpeg,.jpg,.png,.bmp,.gif,.csv,.xlsx,.xls,.txt"
                            v-validate="'required|max_size|ext:pdf,gif,jpeg,jpg,png,bmp,gif,csv,xlsx,xls,zip,txt'"
                            :data-vv-as="$t('document.file')"
                            ref="file"
                            v-on:change="handleFileUpload"
                        />
                        <label
                            class="custom-file-label"
                            :class="['custom-file-'+$root.$i18n.locale]"
                            for="file"
                        >{{(typeof file =='object' &&'name' in file)?file.name:$t('document.choose')}}</label>
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
                    <form-error :attribute_name="'file'" :errors_form="errors"></form-error>
                </div>
                <button
                    :disabled="disableForm"
                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                    type="submit"
                    class="btn btn-primary col-md-12 mt-3"
                >{{ $t('general.send') }}</button>
            </form>
            <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                <iframe v-if="preview" class="rounded h-100 w-100" :src="preview" />
                <h1 v-else class="m-auto d-none d-md-block">
                    {{ file?file.name:$t('general.preview')}}
                </h1>
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import Swal from "@/custom/sweetalert2";

export default {
    components: {
        FormError,
        selectFromTable,
    },
    data() {
        const prefix = this.$session.get("prefix");
        return {
            uploadPercentage: 0,
            disableForm: false,
            inputsData: {
                description: "",
                prefijo: prefix.length == 1 ? prefix[0] : ''
            },
            clients: [],
            file: false,
            previewSrc: null,
            displayAlert: false
        };
    },
    methods: {
        validDocument: function() {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    const formData = new FormData();

                    formData.append("file", this.file);
                    formData.append("description", this.inputsData.description);
                    formData.append("prefijo", this.inputsData.prefijo);

                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addDocumentClient", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                },
                                onUploadProgress: function(progressEvent) {
                                    this.uploadPercentage = parseInt(
                                        Math.round(
                                            (progressEvent.loaded * 100) /
                                                progressEvent.total
                                        )
                                    );
                                }.bind(this)
                            })
                            .then(response => {
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.inputsData.description = "";
                                    this.file = false;
                                    this.$refs.file.value = null;
                                    Swal.fire({
                                        title: this.$t("document.send"),
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t("general.ok"),
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
                                    Swal.fire({
                                        title: response.data.MESSAGE||"Error Form",
                                        confirmButtonText: this.$t("general.ok"),
                                        type: "error"
                                    });
                                }
                                this.uploadPercentage = 0;
                            });
                    }
                });
            }
        },
        getClients: function() {
            this.axios
                .post("getClient", {
                    prefix: this.$session.get("prefix")
                })
                .then(response => {
                    let data = response.data.RESPONSE.RESULTS;
                    this.clients = data.map(function(value) {
                        return {
                            id: value.prefix,
                            name: value.clientName,
                        };
                    });
                });
        },
        setDataFilter: function(campo, value) {
            this.inputsData[campo] = value;
        },
        handleFileUpload: function(event) {
            this.file = event.target.files[0];
        }
    },
    mounted() {
        this.getClients();
    },
    computed: {
        preview: function() {
            if (!this.file) {
                return false;
            }
            if (this.file.type.indexOf("image") == -1 && this.file.type.indexOf("pdf") == -1) {
                return false;
            }
            return URL.createObjectURL(this.file);
        }
    }
};
</script>