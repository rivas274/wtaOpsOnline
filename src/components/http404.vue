
<template>
    <div
        class="m-grid__item m-grid__item--fluid m-grid m-error-1"
        style="background-image: url(./assets/img/error/bg1.jpg);"
    >
        <div class="m-error_container">
            <span class="m-error_number">
                <h1>404</h1>
            </span>
            <h3 class="m-error_desc">{{$t('errorPage.notFound')}}</h3>
            <p class="m-error_desc">
                {{$t('errorPage.notFoundDetail')}}
                <br />
                <router-link :to="{ path: '/'}" replace>{{$t('errorPage.returnHome')}}</router-link>
            </p>
        </div>
    </div>
</template>
<script>
export default {};
</script>
