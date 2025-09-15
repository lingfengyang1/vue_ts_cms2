import { ref } from "vue"

function usePageModal(newClick: any, editClick: any) {
  const modalRef = ref()

  function handleNewClick() {
    modalRef.value.setVisible()
    if (newClick) newClick()
  }

  function handleEditClick(itemData: any) {
    modalRef.value.setVisible(false, itemData)
    if (editClick) editClick(itemData.menuList)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
