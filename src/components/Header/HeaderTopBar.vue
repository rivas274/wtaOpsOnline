<style>
</style>
<template>
    <div id="m_header_topbar" class="m-topbar m-stack m-stack--ver m-stack--general d-flex justify-content-end align-items-center">
        <locale-changer class="pull-right" :active-langs="['es','en']"></locale-changer>
        <notification v-if="middleware('notes_provider', 'read')"  ref="notificationComponent" class="notification"></notification>
        <div class="m-stack__item m-topbar__nav-wrapper">
            <ul class="m-topbar__nav m-nav m-nav--inline">
                <info-user></info-user>
            </ul>
        </div>
    </div>
</template>
<script>
import localeChanger from "../locales/locale-changer.vue";
import InfoUser from "./InfoUser.vue";
import Notification from "./notification.vue";
export default {
    components: { InfoUser, localeChanger, Notification},
};
</script>
