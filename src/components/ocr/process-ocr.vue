<template>
    <div>
        <div class="m-portlet" v-if="xrs || fileOcr.length>0" :class="{ 'loader-vertex': xrs && parseInt(uploadPercentage) > 99 }">
            <div class="m-portlet__body">
                <div class="progress" v-if="uploadPercentage > 0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        :aria-valuenow="uploadPercentage" aria-valuemin="0" aria-valuemax="100"
                        :style="{ width: uploadPercentage + '%' }"></div>
                </div>
                <h3>{{ $t(showStatusLoad) }}</h3>
            </div>
        </div>
        <div v-for="ocr in fileOcr" :key="ocr.uid">
            <div v-if="'customError' in ocr"
                class="alert alert-danger text-left mb-3 mt-1"
                role="alert">
                <strong>Error!</strong>
                {{ ocr.customError }} | {{ ocr.upload.filename }}
            </div>
            <form-document v-else
                :file="ocr"
                :assist-data="assistData"
                @remove="remove">
            </form-document>
        </div>
    </div>
</template>
<script>
import formDocument from "../ocr/form-document-provider.vue";

export default {
    components: {
        formDocument,
    },
    props: {
        file: {
            type: File,
            required: true
        },
        assistData: {
            type: Object,
            default: {}
        },
        allowedCategories: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            xrs: false,
            uploadPercentage: 0,
            fileOcr: []
        }
    },
    mounted() {
        this.callOcr(this.file);
    },
    methods: {
        callOcr: function (file) {
            const self = this;
            let formData = new FormData();

            formData.append('file', file);
            formData.append('idAssist', 'id' in this.assistData ? this.assistData.id : null);
            formData.append('allowed_categories', this.allowedCategories || []);

            self.xrs = true;
            this.axios.post('ocr/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function (progressEvent) {
                    self.uploadPercentage = parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    );
                }
            }).then(function (response) {
                const   responseBase = response.data.RESPONSE,
                        status = response.data.STATUS;
                if (status == 'OK') {
                    responseBase.data.forEach((ocr) => {
                        self.fileOcr.push({
                            file: ocr.file,
                            uid: ocr.uid,
                            ocr: {
                                ...ocr,
                                idVertex: responseBase.idVertex
                            }
                        });
                    });
                } else {
                    self.fileOcr.push({
                        file: responseBase.data.file,
                        uid: responseBase.data['uid'] || Math.random().toString(36).substr(2, 16),
                        ocr: responseBase.data
                    });
                }
            }).catch(function (error) {
                self.fileOcr.push({
                    file: file,
                    uid: Math.random().toString(36).substr(2, 16),
                    ocr: {}
                });
            }).finally(function () {
                self.uploadPercentage = 0;
                self.xrs = false;
            });
        },
        remove: function (file) {
            this.fileOcr = this.fileOcr.filter(f => {
                return f.uid !== file.uid;
            });
        },
    },
    computed: {
        showStatusLoad: function () {
            if (parseInt(this.percentComplete) < 100) {
                return 'ocr.uploadingDocument';
            }
            if (this.xrs) {
                return 'ocr.analyzingDocumentOCR';
            }
            return 'ocr.processCompleted';
        }
    }
};
</script>
<style src="../Element/custom-m-loader.css"></style>