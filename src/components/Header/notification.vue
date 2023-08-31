<template>
    <div class="m-nav__item m-nav__item--accent m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width"
          m-dropdown-toggle="click">
        <a  class=" m-dropdown__toggle" id="m_topbar_notification_icon" >
            <span class="m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger" v-if="hasNotifications"></span>
            <span class="m-nav__link-icon">
                <span class="m-nav__link-icon-wrapper" @click="toggleNotifications">
                    <i class="flaticon-music-2" href="#" ></i>
                </span>
            </span>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--center"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center">
                    <span class="m-dropdown__header-title">
                        {{ notifications.length }} {{$t('notification.messagge')}}
                    </span>
                    <span class="m-dropdown__header-subtitle">
                        {{$t('notification.userNotifications')}}
                    </span>
                </div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
                            <li class="nav-item m-tabs__item">
                                <a class="nav-link m-tabs__link active" data-toggle="tab"
                                    href="#topbar_notifications_notifications" role="tab">
                                    {{$t('notification.notifications')}}
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="topbar_notifications_notifications" role="tabpanel">
                                <div class="m-scrollable" data-scrollable="true" data-height="250" data-mobile-height="200">
                                    <div class="m-list-timeline m-list-timeline--skin-light">
                                        <div class="m-list-timeline__items">
                                            <div v-if="showNotifications" class="notification-popup">
                                                <div class="m-list-timeline">
                                                    <div v-for="(notification, index) in notifications" :key="index" class="m-list-timeline__item">
                                                        <span class="m-list-timeline__badge"></span>
                                                        <span class="m-list-timeline__text">
                                                            {{ notification.message }} 
                                                            <span  @click.prevent="addAssistFromNotification(notification.asist)" class="m-badge m-badge--wide" :class="{ 'm-badge--success': notification.countNoRead <= 0, 'm-badge--warning': notification.countNoRead > 0 }">
                                                                {{ notification.countNoRead > 0 ? $t('notification.pending') : $t('notification.read') }} ({{ notification.countNoRead }})
                                                            </span>
                                                        </span>
                                                        <span class="m-list-timeline__time">{{ notification.time }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

import { mapMutations } from "vuex";
export default {
    name: 'Notification',
    data() {
        return {
            showNotifications: true,
            notifications: [],
        };
    },
    
    computed: {
        hasNotifications() {
            return this.notifications.length > 0;
        },
    },

    methods: {
        ...mapMutations(["addAssist"]),
        toggleNotifications() {
           // this.showNotifications = !this.showNotifications;
        },
        clearNotifications() {
            this.notifications = [];
        },
        addNotification(message, isRead, time, countNoRead, datassi) {
           
            const currentTime = new Date().toLocaleTimeString();
            this.notifications.push({
                message: message,
                isRead: isRead,
                time: time,
                countNoRead: countNoRead,
                asist: datassi,
            });
        },
        // Llamar a la mutación para agregar una asistencia desde la notificación
        addAssistFromNotification(assist) {
      
            this.$store.commit('addAssist',assist);
            this.addAssist(assist);
        },
      
    },
};
</script>