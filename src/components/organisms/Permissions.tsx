import { UserPermission, UserPermissionMap } from "@listed-types"
import { Column, Text } from "native-base"
import { Dispatch, SetStateAction, useState } from "react"
import { Checkbox } from "@listed-components/atoms"
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { PermissionCategory } from "@listed-constants";

interface PermissionsProps extends InterfaceBoxProps {
  handleSelectPermission: (selectedPermissions: Set<UserPermission>) => void;
}

const Permissions = ({ handleSelectPermission, ...props }: PermissionsProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<UserPermission>>(new Set())
  const [collaboratorsSelected, setCollaboratorsSelected] = useState<Set<UserPermission>>(new Set());
  const [productsSelected, setProductsSelected] = useState<Set<UserPermission>>(new Set());
  const [incomingSelected, setIncomingSelected] = useState<Set<UserPermission>>(new Set());
  const [outgoingSelected, setOutgoingSelected] = useState<Set<UserPermission>>(new Set());
  const [transactionSelected, setTransactionSelected] = useState<Set<UserPermission>>(new Set());

  const permissionDependencies: Record<string, UserPermission[]> = {
    VIEW_COLLABORATOR_DETAILS: [UserPermission.VIEW_COLLABORATORS],
    ADD_COLLABORATOR: [UserPermission.VIEW_COLLABORATORS, UserPermission.VIEW_COLLABORATOR_DETAILS],
    UPDATE_COLLABORATOR: [UserPermission.VIEW_COLLABORATORS, UserPermission.VIEW_COLLABORATOR_DETAILS],
    DELETE_COLLABORATOR: [UserPermission.VIEW_COLLABORATORS, UserPermission.VIEW_COLLABORATOR_DETAILS],
    ADD_PRODUCT: [UserPermission.VIEW_PRODUCT_DETAILS],
    UPDATE_PRODUCT: [UserPermission.VIEW_PRODUCT_DETAILS],
    DELETE_PRODUCT: [UserPermission.VIEW_PRODUCT_DETAILS],
    ADD_INCOMING: [UserPermission.GET_INCOMING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    GET_INCOMING_DETAILS: [UserPermission.GET_TRANSACTIONS_LIST],
    ADD_OUTGOING_SOLD: [UserPermission.GET_OUTGOING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    ADD_OUTGOING_DEFECTS: [UserPermission.GET_OUTGOING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    ADD_OUTGOING_EXPIRED: [UserPermission.GET_OUTGOING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    ADD_OUTGOING_LOST: [UserPermission.GET_OUTGOING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    ADD_OUTGOING_CONSUMED: [UserPermission.GET_OUTGOING_DETAILS, UserPermission.VIEW_PRODUCT_DETAILS],
    GET_OUTGOING_DETAILS: [UserPermission.GET_TRANSACTIONS_LIST],
  }

  const reversePermissionDependencies: Record<string, UserPermission[]> = {
    VIEW_COLLABORATORS: [UserPermission.ADD_COLLABORATOR, UserPermission.UPDATE_COLLABORATOR, UserPermission.DELETE_COLLABORATOR, UserPermission.VIEW_COLLABORATOR_DETAILS],
    VIEW_COLLABORATOR_DETAILS: [UserPermission.ADD_COLLABORATOR, UserPermission.UPDATE_COLLABORATOR, UserPermission.DELETE_COLLABORATOR],
    VIEW_PRODUCT_DETAILS: [UserPermission.ADD_PRODUCT, UserPermission.UPDATE_PRODUCT, UserPermission.ADD_INCOMING, UserPermission.ADD_OUTGOING_SOLD, UserPermission.ADD_OUTGOING_DEFECTS, UserPermission.ADD_OUTGOING_EXPIRED, UserPermission.ADD_OUTGOING_LOST, UserPermission.ADD_OUTGOING_CONSUMED, UserPermission.DELETE_PRODUCT],
    GET_INCOMING_DETAILS: [UserPermission.ADD_INCOMING],
    GET_OUTGOING_DETAILS: [UserPermission.ADD_OUTGOING_SOLD, UserPermission.ADD_OUTGOING_DEFECTS, UserPermission.ADD_OUTGOING_EXPIRED, UserPermission.ADD_OUTGOING_LOST, UserPermission.ADD_OUTGOING_CONSUMED],
    GET_TRANSACTIONS_LIST: [UserPermission.GET_INCOMING_DETAILS, UserPermission.GET_OUTGOING_DETAILS],
  }


  const collaborators = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === PermissionCategory.COLLABORATORS
  })
  const products = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === PermissionCategory.PRODUCTS
  })
  const incoming = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === PermissionCategory.INCOMING
  })
  const outgoing = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === PermissionCategory.OUTGOING
  })
  const transactions = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === PermissionCategory.TRANSACTIONS
  })

  const isCheckedByDependent = (permission: keyof typeof UserPermissionMap) => {
    return reversePermissionDependencies[permission] &&
      reversePermissionDependencies[permission].some((permission) => {
        return selectedPermissions.has(permission)
      })
  }

  const handlePermissionChange = () => {
    handleSelectPermission(selectedPermissions);
  }

  const handleSelectChange = (
    isSelected: boolean,
    permissionMap: typeof collaborators | typeof products | typeof incoming | typeof outgoing,
    selected: Set<UserPermission>,
    setSelected: Dispatch<SetStateAction<Set<UserPermission>>>,
    value?: string,
  ) => {
    const category = permissionMap.map((item) => item.permission as UserPermission);

    if (isSelected && value) {
      if (permissionDependencies[value]) {
        const categorySelected = new Set<UserPermission>();
        const allSelected = new Set<UserPermission>();
        permissionDependencies[value].forEach((permission) => {
          if (category.includes(permission)) {
            categorySelected.add(permission);
            allSelected.add(permission);
          } else {
            allSelected.add(permission);
          }
        })
        setSelected(new Set([...selected, ...categorySelected]));
        setSelectedPermissions(new Set([...selectedPermissions, ...allSelected]))
      }
      setSelected((prev) => {
        return new Set([...prev, value as UserPermission])
      })
      setSelectedPermissions((prev) => {
        return new Set([...prev, value as UserPermission])
      })
    } else if (!isSelected && value) {
      const newSet = new Set(selectedPermissions)
      newSet.delete(value as UserPermission);
      setSelectedPermissions(newSet);
      setSelected((prev) => {
        const newSet = new Set(prev)
        newSet.delete(value as UserPermission)
        return newSet
      })
    } else if (isSelected && !value) {
      category.forEach((permission) => {
        if (category.includes(permission)) {
          setSelected((prev) => {
            return new Set([...prev, permission])
          })
          setSelectedPermissions((prev) => {
            return new Set([...prev, permission])
          })
        } else {
          setSelectedPermissions((prev) => {
            return new Set([...prev, permission])
          })
        }
      })
    }
    handlePermissionChange();
  };

  return (
    <Column space="1" {...props}>
      <Checkbox value="Collaborators" my="1" marginTop="2"
        isSelected={collaboratorsSelected.size === collaborators.length}
        isDisabled={collaboratorsSelected.size > 0}
        isIndeterminate={collaboratorsSelected.size > 0 && collaboratorsSelected.size < collaborators.length}
        onChange={(isChecked) => {
          isChecked
            && handleSelectChange(
              isChecked,
              collaborators,
              collaboratorsSelected,
              setCollaboratorsSelected,
            );
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Collaborators</Text>
      </Checkbox>
      {
        collaborators.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={selectedPermissions.has(permission.permission)}
              isDisabled={isCheckedByDependent(permission.permission)}
              onChange={(isChecked, value) => {
                handleSelectChange(
                  isChecked,
                  collaborators,
                  collaboratorsSelected,
                  setCollaboratorsSelected,
                  value,
                );
              }}
              value={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
      <Checkbox value="Products" my="1" marginTop="2"
        isSelected={productsSelected.size === products.length}
        isDisabled={productsSelected.size > 0}
        isIndeterminate={productsSelected.size > 0 && productsSelected.size < products.length}
        onChange={(isChecked) => {
          isChecked
            && handleSelectChange(
              isChecked,
              products,
              productsSelected,
              setProductsSelected,
            );
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Products</Text>
      </Checkbox>
      {
        products.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={selectedPermissions.has(permission.permission)}
              isDisabled={isCheckedByDependent(permission.permission)}
              onChange={(isTrue, value) => {
                handleSelectChange(
                  isTrue,
                  products,
                  productsSelected,
                  setProductsSelected,
                  value,
                )
              }}
              value={permission.permission}
              aria-label={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
      <Checkbox value="Incoming" my="1" marginTop="2"
        isSelected={incomingSelected.size === incoming.length}
        isDisabled={incomingSelected.size > 0}
        isIndeterminate={incomingSelected.size > 0 && incomingSelected.size < incoming.length}
        onChange={(isChecked) => {
          isChecked
            && handleSelectChange(
              isChecked,
              incoming,
              incomingSelected,
              setIncomingSelected,
            );
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Incoming</Text>
      </Checkbox>
      {
        incoming.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={selectedPermissions.has(permission.permission)}
              isDisabled={isCheckedByDependent(permission.permission)}
              onChange={(isChecked, value) => {
                handleSelectChange(
                  isChecked,
                  incoming,
                  incomingSelected,
                  setIncomingSelected,
                  value,
                )
              }}
              value={permission.permission}
              aria-label={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
      <Checkbox value="Outgoing" my="1" marginTop="2"
        isSelected={outgoingSelected.size === outgoing.length}
        isDisabled={outgoingSelected.size > 0}
        isIndeterminate={outgoingSelected.size > 0 && outgoingSelected.size < outgoing.length}
        onChange={(isChecked) => {
          isChecked
            && handleSelectChange(
              isChecked,
              outgoing,
              outgoingSelected,
              setOutgoingSelected,
            );
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Outgoing</Text>
      </Checkbox>
      {
        outgoing.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={selectedPermissions.has(permission.permission)}
              isDisabled={isCheckedByDependent(permission.permission)}
              value={permission.permission}
              onChange={(isChecked, value) => {
                handleSelectChange(
                  isChecked,
                  outgoing,
                  outgoingSelected,
                  setOutgoingSelected,
                  value,
                )
              }}
              aria-label={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
      <Checkbox value="Transactions" my="1" marginTop="2"
        isSelected={transactionSelected.size === transactions.length}
        isDisabled={transactionSelected.size > 0}
        onChange={(isChecked) => {
          isChecked
            && handleSelectChange(
              isChecked,
              transactions,
              transactionSelected,
              setTransactionSelected,
            );
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Transactions</Text>
      </Checkbox>
      {
        transactions.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={selectedPermissions.has(permission.permission)}
              isDisabled={isCheckedByDependent(permission.permission)}
              value={permission.permission}
              onChange={(isChecked, value) => {
                handleSelectChange(
                  isChecked,
                  transactions,
                  transactionSelected,
                  setTransactionSelected,
                  value,
                )
              }}
              aria-label={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
    </Column>
  )
}

export default Permissions