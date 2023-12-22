import { Message } from 'element-ui';
import { Ref, ref } from 'vue';

export function useTablePagination<PageItem>({
  getPage,
  searchForm,
}: {
  getPage: Function;
  searchForm: Ref<Record<string, any>>;
}) {
  const searchFormRef = ref();
  const paginationParams = ref({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });
  const tableData: Ref<PageItem[]> = ref([]);

  /** 获取表格信息 */
  async function getTableData() {
    const res = await getPage({
      params: searchForm.value,
      pageNumber: paginationParams.value.pageNumber,
      pageSize: paginationParams.value.pageSize,
    });
    if (res.code === 200) {
      const { data } = res;
      tableData.value = data.records;
      paginationParams.value.pageNumber = data.pageNumber;
      paginationParams.value.pageSize = data.pageSize;
      paginationParams.value.total = data.total;
    } else {
      Message.error(res.msg || '');
    }
  }

  /** 查询 */
  const onClickSearch = async () => {
    paginationParams.value.pageNumber = 1;
    getTableData();
  };

  /** 重置 */
  const onClickSearchFormReset = () => {
    searchFormRef.value.resetFields();
    onClickSearch();
  };

  return {
    searchFormRef,
    paginationParams,
    tableData,
    onClickSearch,
    getTableData,
    onClickSearchFormReset,
  };
}
