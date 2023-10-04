import { SmallCollaborator, SmallIncoming, SmallOutgoing, SmallProducts, SmallTransactions } from "@listed-components/atoms"
import { PermissionCategory } from "@listed-constants"
import { UserPermission, UserPermissionMap } from "@listed-types"
import { filterPermissionsByCategory } from "@listed-utils"
import { Box, Column, Divider, Row, Text, View } from "native-base"
import { ReactNode } from "react"

interface PermissionDetailsProps {
  permissions: UserPermission[]
}


const PermissionDetails = ({ permissions }: PermissionDetailsProps) => {
  const categories = Object.values(PermissionCategory)

  const permissionCategoryIcons: Record<PermissionCategory, ReactNode> = {
    [PermissionCategory.COLLABORATORS]: <SmallCollaborator />,
    [PermissionCategory.PRODUCTS]: <SmallProducts />,
    [PermissionCategory.INCOMING]: <SmallIncoming />,
    [PermissionCategory.OUTGOING]: <SmallOutgoing />,
    [PermissionCategory.TRANSACTIONS]: <SmallTransactions />,
  };

  return (
    <View>
      <Text fontWeight="medium"
        color="text.500"
        marginBottom="1">
        PERMISSIONS
      </Text>
      <Column paddingY="2" paddingX="4"
        borderRadius="sm"
        borderWidth="1"
        borderColor="muted.300">
        {
          permissions.includes(UserPermission.OWNER)
            ?
            <Column paddingY="4" alignItems="center">
              <Text fontWeight="semibold"
                fontSize="md"
                textAlign="center">
                Owner
              </Text>
              <Text textAlign="center">Owners have access to all features.</Text>
            </Column>
            : categories.map((category, index) => {
              const permissionsInCategory = filterPermissionsByCategory(
                permissions,
                category
              );
              return (
                <View key={index}>
                  <Column paddingY="2" >
                    <Row alignItems="center" space="2">
                      {permissionCategoryIcons[category]}
                      <Text fontWeight="semibold"
                        opacity={
                          permissionsInCategory.length === 0
                            ? 0.5
                            : 1
                        }
                      >{category}
                      </Text>
                    </Row>
                    <Box marginLeft="8">
                      {
                        permissionsInCategory.length === 0
                          ? <Text color="text.500">
                            No permissions under this category.
                          </Text>
                          : permissionsInCategory.map((permission, index) => {
                            return (
                              <Text key={index}>
                                {
                                  UserPermissionMap[
                                    permission as keyof typeof UserPermissionMap
                                  ]
                                    .description
                                }
                              </Text>
                            )
                          })
                      }
                    </Box>
                  </Column>
                  {
                    index < categories.length - 1 && <Divider />
                  }
                </View>
              )
            })
        }
      </Column>
    </View>
  )
}

export default PermissionDetails