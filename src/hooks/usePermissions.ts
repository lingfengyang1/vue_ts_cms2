import useLoginStore from "@/store/login/login"

function usePermissions(permissionID: string) {
  console.log(permissionID)
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  console.log(permissions)
  return permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
