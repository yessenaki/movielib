<template>
  <teleport to="body">
    <div class="modal" v-if="isVisible" @click="$emit('close')">
      <div class="modal__content">
        <div class="modal__header">
          <h1 class="modal__title">Trailer for {{ title }}</h1>
          <button class="modal__close">&times;</button>
        </div>
        <div class="modal__body">
          <iframe
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            width="100%"
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'ModalDialog',
  props: ['isVisible', 'title', 'trailer'],
  emits: ['close']
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
}
.modal__content {
  background-color: #2f2f2f;
  max-width: 738px;
  margin: 80px auto;
  -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.6);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.6);
}
.modal__header {
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  padding: 0.6rem 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.modal__title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  opacity: 0.9;
}
.modal__close {
  background-color: transparent;
  color: #fff;
  line-height: 1;
  font-size: 1.5rem;
  cursor: pointer;
  border: 0;
  opacity: 0.9;
  outline: none;
}
.modal__body {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.modal__body iframe {
  position: absolute;
  top: 0;
  left: 0;
}

@media (max-width: 768px) {
  .modal__content {
    margin: 15px;
  }
}
</style>