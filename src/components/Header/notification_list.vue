<template>
    <div>
      <!-- ... Otras partes de tu interfaz ... -->
      <Notification ref="notificationComponent" />
    </div>
  </template>
  
  <script>
  import Notification from '@/components/Notification.vue';
  
  export default {
    components: {
      Notification,
    },
    methods: {
      mostrarNotificacion() {
        const message = 'Nueva notificación!';
        this.$refs.notificationComponent.addNotification(message);
      },
    },
  };
  </script>