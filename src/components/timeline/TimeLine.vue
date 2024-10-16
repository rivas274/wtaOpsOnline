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

<template>
    <div class="tab-content">
        <div class="tab-pane active" id="m_widget2_tab1_content" aria-expanded="true">
            <div class="m-timeline-1 m-timeline-1--fixed">
                <div class="m-timeline-1__items">
                    <div class="m-timeline-1__marker"></div>

                    <div v-for="(dates,keyDates) in this.events " :key="keyDates">
                        <div v-for="(date,key) in dates" :key="key">
                            <div
                                class="m-timeline-1__item m-timeline-1__item--first"
                                :class="[key%2==0?'m-timeline-1__item--left':'m-timeline-1__item--right']"
                            >
                                <div
                                    class="m-timeline-1__item-circle m--bg-success inner-circle font-white fa-2x m--font-inverse-focus"
                                    :class="date.class"
                                ></div>
                                <div class="m-timeline-1__item-arrow"></div>
                                <div class="m-timeline-1__item-time">
                                    <template v-if="date.user">
                                        {{date.user.name}} ({{date.user.user}}) @ 
                                    </template>
                                    <small>{{date.date}}</small>
                                </div>
                                <div class="m-timeline-1__item-content m--margin-top-40">
                                    <div class="m-timeline-1__item-title">
                                        <strong>{{date.title || 'Not Found'}}</strong>
                                    </div>
                                    <div v-if="date.detaill && !date.provider_info" class="m-timeline-1__item-body">
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