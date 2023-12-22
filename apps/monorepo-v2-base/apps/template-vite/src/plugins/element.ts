/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝 Element 组件按需引入
 * @copyright 🤝In me the tiger sniffs the rose.
 */
import Vue from 'vue';
import ElementUI from 'element-ui';

// element-ui 2.15.9 存在 bug，兼容处理方案。已解决
// function RepairProps(cmp: any) {
//   (cmp.mixins || []).forEach((mixin: any) => {
//     if (mixin.props && mixin.props.placement) {
//       const defaultValue = mixin.props.placement.default;
//       mixin.data = new Proxy(mixin.data, {
//         apply(target, thisArg, argArray) {
//           const res = Reflect.apply(target, thisArg, argArray);
//           return {
//             ...(res || {}),
//             placement: defaultValue,
//           };
//         },
//       });
//       delete mixin.props.placement;
//     }
//     if (mixin.mixins && mixin.mixins.length > 0) RepairProps(mixin);
//   });
// }

// RepairProps(ElementUI.DatePicker);
// RepairProps(ElementUI.TimePicker);
// RepairProps(ElementUI.TimeSelect);

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
