<template>
    <div>
        <div class="mb-3">
            <form action="#" class="dropzone ">
                <div class="dz-message">
                    {{ $t('ocr.dropOrClickFiles') }}
                </div>
            </form>
        </div>
        <slot>
        </slot>
    </div>
</template>
<script>

import $ from '@/custom/jquery-custom';
import { Dropzone } from "dropzone";

export default {
    props: {
        idAssist: {
            type: Number | String,
            required: false
        },
        files: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.initDropzone();
    },
    methods: {
        initDropzone: function () {
            const self = this;
            new Dropzone(
                $(this.$el).find('.dropzone')[0],
                {
                    autoProcessQueue: false,
                    maxFilesize: 20,
                    acceptedFiles: '.pdf,.png,.bmp,.gif,.jpg,.jpeg',
                    //obtengo el file del input y lo agrego a los files
                    error: function (file, customError) {
                        if (!file.accepted) {
                            self.files.push({ customError, ...file });
                        }
                        return false;
                    },
                    addedfile: function (file) {
                        setTimeout(() => {
                            if (file.accepted) {
                                self.files.push(file);
                            }
                        }, 2 * 100);
                    }
                });
        }
    }
};
</script>

<style src="../Element/custom-m-loader.css"></style>

<style>
.dropzone {
    min-height: 100px !important;
    border: 2px dashed rgba(0, 0, 0, .8) !important;
}
</style>