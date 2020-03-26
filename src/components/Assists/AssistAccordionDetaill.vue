<template>
    <div class="col-xl-4">
        <div class="m-portlet__body">
            <div class="m-widget16">
                <div class="row">
                    <div class="col-md-12">
                        <div class="m-widget16__head">
                            <div class="m-widget16__item">
                                <span class="m-widget16__amount m--align-center">
                                    <slot name="title"></slot>
                                </span>
                            </div>
                        </div>
                        <div class="m-widget16__body">
                            <div class="m-widget16__item">
                                <slot name="body"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
