/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝 按钮加载中指令，用于按钮加载中状态，防止重复点击
 * @copyright 🤝In me the tiger sniffs the rose.
 */

const loading = {
  inserted(el, binding) {
    const { value } = binding;

    if (typeof value !== 'function') {
      throw new Error('v-loading 指令的值必须为函数');
    } else {
      // 获取原始函数
      const originalFunc = value;
      el.addEventListener('click', async (...args: any[]) => {
        // 1. Disabled button
        el.setAttribute('disabled', 'disabled');
        el.classList.add('is-loading');
        const icon = document.createElement('i');
        icon.classList.add('el-icon-loading');
        // Insert icon before text
        el.insertBefore(icon, el.childNodes[0]);
        // 2. Run original function
        try {
          await originalFunc(...args);
        } finally {
          // 3. Enable button
          el.removeAttribute('disabled');
          el.classList.remove('is-loading');
          el.removeChild(icon);
        }
      });
    }
  },
};

export default loading;
