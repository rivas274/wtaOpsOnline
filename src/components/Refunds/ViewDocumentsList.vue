<template>
    <div>
        <div class="container mt-4">
            <div class="row">
                <!-- Iterar sobre cada documento -->
                <div class="col-md-4 mb-4 p-0 px-md-3" v-for="doc in arrFiles" :key="doc.idFile">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-truncate">{{ doc.category }}</h5>
                            <p class="card-text">
                                <strong>{{ $t('document.description') }}:</strong> {{ doc.description }}<br>
                                <strong>{{ $t('document.uploadDate') }}:</strong> {{ doc.createdDate.date }} <small>({{ doc.createdDate.hour }})</small> <br>
                                <strong>{{ $t('general.status') }}:</strong> {{ doc.billStatusDesc }}
                            </p>
                        </div>
                        <div class="card-footer p-0">
                            <a 
                                :href="doc.url" 
                                class="btn btn-primary btn-md btn-block " 
                                target="_blank" 
                                download>
                                {{ $t('general.preview') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        pin: {
            type: String|Number,
            required: true
        },
        idAssist: {
            type: String|Number,
            required: true
        },
        loader: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            results:[]
        };
    },
    mounted() {
        this.getDocuments();
    },
    methods: {
        getDocuments: function () {
            this.$emit("loader:update", true);
            this.axios
                .post("viewDocumentRefund/getDocuments", {
                    idAssist: this.idAssist,
                    pin:this.pin
                })
                .then(response => {
                    this.$emit("loader:update", false);
                    let data = response.data;
                    if (data.STATUS != 'OK') {
                        //recargamos la pagina
                        this.$router.go();
                    }
                    this.results = data['RESULTS'];

                });
        },
    },
    computed: {
        backRefund: function () {
            return `/${this.$route.params.lang}/reimbursement/${this.$route.params.code}`;
        },
        arrFiles: function(){
            let baseUrl = this.baseUrlApi();
            return this.results.map(function (file) {
                return {
                    ...file,
                    url: baseUrl + "streaming/" + file.idFile
                };
            });
        }
    }
}
</script>