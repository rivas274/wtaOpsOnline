<template>
    <div class="m-accordion__item">
        <div
            class="m-accordion__item-head"
        >
            <span class="m-accordion__item-icon">
                <i :class="[ico]"></i>
            </span>
            <span class="m-accordion__item-title collapsed"
                    role="tab"
                    data-toggle="collapse"
                    :href="'#m_accordion_item_1_body_'+id">
                <slot name="title"></slot>
            </span>
            <span class="m-accordion__item-icon">
                <slot name="title-left"></slot>
            </span>
            <span class="m-accordion__item-mode collapsed"
                    role="tab"
                    data-toggle="collapse"
                    :href="'#m_accordion_item_1_body_'+id"></span>
        </div>
        <div
            class="m-accordion__item-body collapse"
            :id="'m_accordion_item_1_body_'+id"
            role="tabpanel"
            :aria-labelledby="'m_accordion_item_1_head_'+id"
            data-parent=".m-accordion"
        >
            <div class="m-accordion__item-content">
                <div class="m-portlet">
                    <div class="m-portlet__body m-portlet__body--no-padding">
                        <div class="row m-row--no-padding m-row--col-separator-xl">
                            <slot name="body"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["id", "ico"]
};
</script>