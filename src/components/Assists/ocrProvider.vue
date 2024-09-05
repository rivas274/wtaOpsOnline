<template>
    <add-document :id-assist="idAssist" :files.sync="files">
        <div v-for="fl in files" :key="fl.uid">
            <div v-if="'customError' in fl"
                class="alert alert-danger text-left mb-3 mt-1" role="alert">
                <strong>Error!</strong> {{ fl.customError }} | {{ fl.upload.filename }}
            </div>
            <process-ocr v-else :file="fl" :ocr.sync="fileOcr" :assist-data="assistData"
                :allowed-categories="allowedCategories">
            </process-ocr>
        </div>
    </add-document>
</template>

<script>

import addDocument from "../ocr/add-document.vue";
import processOcr from "../ocr/process-ocr.vue";

export default {
    components: {
        addDocument,
        processOcr,
    },
    props: ["id-assist"],
    data() {
        return {
            files: [],
            fileOcr: [],
            allowedCategories: [7, 8, 17],
            assistData: {},
        };
    },
    mounted() {
        this.getAssist();
    },
    methods: {
        processing: function (fileOcr) {
            this.fileOcr = [...this.fileOcr, ...fileOcr];
        },
        getAssist: function () {
            if (!this.idAssist) {
                return;
            }
            this.axios
                .post("ocr/getAssist", {
                    idAssist: this.idAssist
                }).then(response => {
                    this.assistData = response.data.RESPONSE;
                });
        },
    },
};

</script>