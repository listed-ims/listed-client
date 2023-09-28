import { UserPermission, UserPermissionMap } from "@listed-types"
import { Column, Text } from "native-base"
import { useState } from "react"
import { Checkbox } from "@listed-components/atoms"

const Permissions = () => {
  const selectedPermissions: Set<UserPermission> = new Set();
  const [collaboratorsSelected, setCollaboratorsSelected] = useState(false);
  const [productsSelected, setProductsSelected] = useState(false);
  const [incomingSelected, setIncomingSelected] = useState(false);
  const [outgoingSelected, setOutgoingSelected] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState(false);

  const collaborators = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === "Collaborators"
  })
  const products = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === "Products"
  })
  const incoming = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === "Incoming"
  })
  const outgoing = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === "Outgoing"
  })
  const transactions = Object.values(UserPermissionMap).filter((permission) => {
    return permission.category === "Transactions"
  })

  function handleSelectPermission(isSelected: boolean, value: string) {
    if (isSelected) {
      selectedPermissions.add(value as UserPermission)
    } else {
      selectedPermissions.delete(value as UserPermission)
    }
  }

  return (
    <Column space="1">
      <Checkbox value="Collaborators" my="1" marginTop="2"
        onChange={(isTrue) => {
          setCollaboratorsSelected(isTrue)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Collaborators</Text>
      </Checkbox>
      {
        collaborators.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={collaboratorsSelected}
              onChange={(isTrue, value) => {
                handleSelectPermission(isTrue, value)
              }}
              value={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }
      <Checkbox value="Products" my="1" marginTop="2"
        onChange={(isTrue) => {
          setProductsSelected(isTrue)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Products</Text>
      </Checkbox>
      {
        products.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={productsSelected}
              onChange={(isTrue, value) => {
                handleSelectPermission(isTrue, value)
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
        onChange={(isTrue) => {
          setIncomingSelected(isTrue)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Incoming</Text>
      </Checkbox>
      {
        incoming.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={incomingSelected}
              onChange={(isTrue, value) => {
                handleSelectPermission(isTrue, value)
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
        onChange={(isTrue) => {
          setOutgoingSelected(isTrue)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Outgoing</Text>
      </Checkbox>
      {
        outgoing.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={outgoingSelected}
              value={permission.permission}
              onChange={(isTrue, value) => {
                handleSelectPermission(isTrue, value)
              }}
              aria-label={permission.permission}
              my="1" marginLeft="4">
              <Text fontSize="md">{permission.description}</Text>
            </Checkbox>
          )
        })
      }

      <Checkbox value="Transactions" my="1" marginTop="2"
        onChange={(isTrue) => {
          setTransactionSelected(isTrue)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">Transactions</Text>
      </Checkbox>
      {
        transactions.map((permission) => {
          return (
            <Checkbox key={permission.permission}
              isSelected={transactionSelected}
              value={permission.permission}
              onChange={(isTrue, value) => {
                handleSelectPermission(isTrue, value)
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