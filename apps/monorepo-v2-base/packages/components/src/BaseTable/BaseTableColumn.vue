<script lang="tsx">
import { defineComponent } from 'vue';
import { TableColumn } from 'element-ui';

export default defineComponent({
  render() {
    // eslint-disable-next-line no-undef
    const innerRender = this.$attrs.render && (this.$attrs.render as unknown as (...args: any) => JSX.Element);
    if (innerRender) {
      return (
        <TableColumn
          props={this.$attrs}
          {...{
            // 作用域插槽
            scopedSlots: {
              default: (scope) => {
                return innerRender(scope.row, scope.$index);
              },
            },
          }}
        ></TableColumn>
      );
    } else {
      return <TableColumn props={this.$attrs}></TableColumn>;
    }
  },
});
</script>
