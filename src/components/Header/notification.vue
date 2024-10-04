<template>
    <div class="m-nav__item m-nav__item--accent m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width"
        m-dropdown-toggle="click">
        <a class=" m-dropdown__toggle" id="m_topbar_notification_icon">
            <span class="pulse-warning m-nav__link-badge m-badge m-badge--dot m-badge--dot-large m-badge--danger"
                v-if="hasNotifications"></span>
            <span class="m-nav__link-icon">
                <span class="m-nav__link-icon-wrapper">
                    <i class="fa fa-2x fa-bell" href="#"></i>
                </span>
            </span>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--center"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center">
                    <span class="m-dropdown__header-title">
                        {{ notifications.length }} {{ $t('notification.messagge') }}
                    </span>
                    <span class="m-dropdown__header-subtitle">
                        {{ $t('notification.userNotifications') }}
                    </span>
                </div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
                            <li class="nav-item m-tabs__item">
                                <a class="nav-link m-tabs__link active" data-toggle="tab"
                                    href="#topbar_notifications_notifications" role="tab">
                                    {{ $t('notification.notifications') }}
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="topbar_notifications_notifications" role="tabpanel">
                                <div class="m-scrollable" data-scrollable="true" data-height="250" data-mobile-height="200">
                                    <div class="m-list-timeline m-list-timeline--skin-light">
                                        <div class="m-list-timeline__items">
                                            <div class="notification-popup">
                                                <div class="m-list-timeline">
                                                    <div v-for="(notification, index) in notifications" :key="index"
                                                        class="m-list-timeline__item">
                                                        <span class="m-list-timeline__badge"></span>
                                                        <span class="m-list-timeline__text">
                                                            {{ notification.codigo_asistencia }}
                                                            <span @click.prevent="addAssistFromNotification(notification)"
                                                                class="m-badge m-badge--wide"
                                                                :class="{ 'm-badge--success': notification.cant_sms <= 0, 'm-badge--warning': notification.cant_sms > 0 }">
                                                                {{ notification.cant_sms > 0 ? $t('notification.pending')
                                                                    : $t('notification.read') }} ({{ notification.cant_sms
    }})
                                                            </span>
                                                        </span>
                                                        <span class="m-list-timeline__time">{{ notification.created }}</span>
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

<style>
.pulse-warning {
    animation-name: pulse-warning;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes pulse-warning {
    0% {
        box-shadow: 0px 0px 5px 0px #f80606;
    }

    65% {
        box-shadow: 0px 0px 5px 10px #fa3b014d;
    }

    90% {
        box-shadow: 0px 0px 5px 10px #f8930600;
    }
}
</style>

<script>

import { mapMutations } from "vuex";
export default {
    name: 'Notification',
    data() {
        return {
            notifications: [],
        };
    },

    computed: {
        hasNotifications() {
            return this.notifications.length > 0;
        },
    },
    mounted() {
        this.getNotification();
        setInterval(
            () => {
                this.getNotification();
            },
            1000 * 60 * 0.25
        );

    },
    methods: {
        ...mapMutations(["addAssist"]),
        getNotification() {
            this.axios
                .post("getNotification", {
                    idProvider: this.$session.get("provider").id,
                    timestamp:(new Date()).getTime(), //enviamos un parámetro dinámico para deshabilitar la cache de axios
                })
                .then(response => {
                    this.notifications = response.data.RESPONSE.RESULTS;
                })
                .catch(error => {
                    console.error("Error al obtener las notificaciones:", error);
                });
        },
        // Llamar a la mutación para agregar una asistencia desde la notificación
        addAssistFromNotification(notificacion) {
            this.addAssist(notificacion);
        },
    },
};
</script>