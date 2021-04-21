<template>
  <div class="arcus-footer-wrapper clearfix">
    <div class="w arcus-footer">
      <p>
        Copyright &copy; 2020 arcus. All Rights Reserved | ICP备 20202020号-100
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArcusFooter'
}
</script>

<style lang="scss" scoped>
$arcusFooterHeight: 120px;
$arcusFooterBg:#1c1f21;
.arcus-footer-wrapper {
  height: $arcusFooterHeight;
  background: $arcusFooterBg;
  font-size: 12px;
  color: #787d82;
  .arcus-footer {
    padding: 30px;
  }
}

</style>
