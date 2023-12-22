<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { isExternal } from '@/utils/validate';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const type = computed(() => {
  if (isExternal(props.to)) return 'a';
  return 'router-link';
});

const linkProps = (to: string) => {
  if (isExternal(to)) {
    return {
      href: to,
      target: '_blank',
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener
      rel: 'noopener noreferrer',
    };
  }
  return {
    to,
  };
};
</script>
