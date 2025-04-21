declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Add Vue Language Server type definitions
declare global {
  namespace __VLS {
    function withDefaults<T, D>(
      source: T,
      defaults: D
    ): T & {
      default: D
    }

    function defineProps<T>(): T
    function defineEmits<T>(): T

    interface ComponentCustomProperties {
      // Add any global properties here
    }

    interface FunctionalComponentCtx {
      props: any
      attrs: any
      slots: any
      emit: (...args: any[]) => void
    }

    function pickFunctionalComponentCtx<T>(): FunctionalComponentCtx
  }
}
