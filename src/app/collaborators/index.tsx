import { AddIcon, Button } from "@listed-components/atoms"
import { CollaboratorListItem, CollaboratorsFilter } from "@listed-components/molecules"
import { ScreenContainer } from "@listed-components/organisms"
import { Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useGetCollaborators } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipStatus, UserPermission } from "@listed-types"
import { setCollaboratorsCurrentUserFirst } from "@listed-utils"
import { Stack, router } from "expo-router"
import { Column, FlatList, useTheme } from "native-base"
import React, { useState } from "react"


const Collaborators = () => {
  const { colors } = useTheme();
  const [currentFilter, setCurrentFilter] = useState<"ALL" | Omit<MembershipStatus, "DECLINED">>("ALL");

  const { userDetails, userPermissions } = useAuth();

  let filters: MembershipStatus[] = ["ACTIVE", "INACTIVE"] as MembershipStatus[]
  if (userPermissions.includes(UserPermission.OWNER)) {
    filters = ["ACTIVE", "INACTIVE", "PENDING"] as MembershipStatus[]
  }

  const {
    data: collaboratorsList,
    isError: collaboratorsListError,
    isFetching: collaboratorsListFetching,
    isSuccess: collaboratorsListSuccess,
  } = useGetCollaborators(
    userDetails?.currentStoreId as number,
    currentFilter === "ALL" ?
      undefined :
      currentFilter === "ACTIVE" ?
        MembershipStatus.ACTIVE :
        currentFilter === "INACTIVE" ?
          MembershipStatus.INACTIVE :
          MembershipStatus.PENDING,
  )


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Collaborators")} />
      <Column height="full" space="4"
        paddingTop="4"
        paddingBottom="6"
      >
        <CollaboratorsFilter
          filters={filters}
          handleSetFilter={(filter) => { setCurrentFilter(filter) }} />
        <FlatList
          data={setCollaboratorsCurrentUserFirst(collaboratorsList, userDetails?.id!, filters[2] ? undefined : MembershipStatus.PENDING)}
          renderItem={({ item, index }) => (
            <CollaboratorListItem
              key={index}
              name={item.user.name}
              membershipStatus={item.membershipStatus}
              isYou={item.user.id === userDetails?.id}
              userRole={item.permissions.includes(UserPermission.OWNER) ? "owner" : "collaborator"}
            />
          )}
        />
        <Button
          alignSelf="flex-end"
          size="sm"
          px="4"
          startIcon={<AddIcon color={colors.white} />}
          borderRadius="full"
          onPress={() => {
            router.push(Routes.NEW_COLLABORATOR)
          }}
        >
          Add Collaborator
        </Button>
      </Column>
    </ScreenContainer>
  )
}

export default Collaborators