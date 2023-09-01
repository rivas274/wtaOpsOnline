<style>
</style>
<template>
    <div id="m_header_topbar" class="m-topbar m-stack m-stack--ver m-stack--general">
        <locale-changer class="pull-right" :active-langs="['es','en']"></locale-changer>
        <div class="m-stack__item m-topbar__nav-wrapper">
            <ul class="m-topbar__nav m-nav m-nav--inline">
                <notification v-if="middleware('notes_provider', 'read')"  ref="notificationComponent" class="notification"></notification>
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
<style>
.m-topbar .locale-changer{
    margin-top: 20px;
}
.notification{
    height: 50% !important;
    margin-top: 20px;
}
</style>