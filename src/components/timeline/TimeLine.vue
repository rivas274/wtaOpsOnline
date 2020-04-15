<style scoped>
.inner-circle {
    width: 2.5rem !important;
    height: 2.5rem !important;
    font-size: 1.5rem !important;
}
.m-timeline-1__item-time {
    width: max-content;
}
</style>
<style src="../Element/custom-m-loader.css"></style>
<template>
    <div class="tab-content">
        <div class="tab-pane active" id="m_widget2_tab1_content" aria-expanded="true">
            <div class="m-timeline-1 m-timeline-1--fixed">
                <div class="m-timeline-1__items">
                    <div class="m-timeline-1__marker"></div>

                    <div v-for="dates in this.events " :key="dates">
                        <div v-for="(date,key) in dates" :key="date">
                            <div
                                class="m-timeline-1__item m-timeline-1__item--first"
                                :class="[key%2==0?'m-timeline-1__item--left':'m-timeline-1__item--right']"
                            >
                                <div
                                    class="m-timeline-1__item-circle m--bg-success inner-circle font-white fa-2x m--font-inverse-focus"
                                    :class="date.class"
                                ></div>
                                <div class="m-timeline-1__item-arrow"></div>
                                <div class="m-timeline-1__item-time">{{date.user.name}} ({{date.user.user}}) @ <small>{{date.date}}</small></div>
                                <div class="m-timeline-1__item-content m--margin-top-40">
                                    <div class="m-timeline-1__item-title">
                                        <strong>{{date.title}}</strong>
                                    </div>
                                    <div v-if="date.detaill" class="m-timeline-1__item-body">
                                        <div
                                            class="m-timeline-1__item-body m--margin-top-15"
                                            v-html="date.detaill"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["id-assist"],
    data: function() {
        return {
            events: {},
            assist: this.idAssist
        };
    },
    methods: {
        getTimeLine: function() {
            this.showLoader = true;
            this.axios
                .post("getTimeLine", {
                    idAssist: this.assist
                })
                .then(response => {
                    this.showLoader = false;
                    this.events = response.data.RESPONSE;
                });
        }
    },
    computed: {},
    mounted() {
        this.getTimeLine();
    }
};
</script>