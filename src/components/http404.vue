<style>
.page-404 {
  text-align: center;
}
.page-404 .number {
  position: relative;
  top: 35px;
  display: inline-block;
  margin-top: 0;
  margin-bottom: 10px;
  color: #7bbbd6;
  text-align: right;
  letter-spacing: -10px;
  line-height: 128px;
  font-size: 128px;
  font-weight: 300;
}
.page-404 .details {
  padding-top: 0;
  text-align: left;
  margin-left: 40px;
  display: inline-block;
}
@media (max-width: 480px) {
  .page-404 .details,
  .page-404 .number {
    text-align: center;
    margin-left: 0;
  }
}
</style>
<template>
  <div class="col-md-12 page-404">
    <div class="number font-green">404</div>
    <div class="details">
      <h3>Page not found</h3>
      <p>We can not find the page you're looking for.
        <br>
        <router-link :to="{ path: '/'}" replace>Return home</router-link> or try the search bar below.
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
