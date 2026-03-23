<script>
  export let src;
  export let title = "";
</script>

<div class="video-container">
  <video controls>
    <source {src} type="video/mp4">
    <track kind="captions">
  </video>
  {#if title}<em>{title}</em>{/if}
</div>
