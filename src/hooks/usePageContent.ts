import { ref } from "vue"

function usePageContent() {
  const contentRef = ref()

  function handleResetClick() {
    contentRef.value.fetchResultList()
  }

  function handleQueryClick(searchForm: any) {
    contentRef.value.fetchResultList(searchForm)
  }

  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
