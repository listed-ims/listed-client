import { AddIcon, Button } from "@listed-components/atoms"
import { CollaboratorListItem, CollaboratorsFilter, CollaboratorsListLoadingSkeleton } from "@listed-components/molecules"
import {
  EmptyCollaboratorList,
  ScreenContainer
} from "@listed-components/organisms"
import { GET_COLLABORATOR, Routes } from "@listed-constants"
import { useAuth } from "@listed-contexts"
import { useGetCollaborators } from "@listed-hooks"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipResponse, MembershipStatus, UserPermission } from "@listed-types"
import { hasPermission, setCollaboratorsCurrentUserFirst, } from "@listed-utils"
import { useQueryClient } from "@tanstack/react-query"
import { Stack, router } from "expo-router"
import { Column, FlatList, useTheme } from "native-base"
import React, { useCallback, useEffect, useState } from "react"


const Collaborators = () => {
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [currentFilter, setCurrentFilter] = useState<"ALL" | Omit<MembershipStatus, "DECLINED">>("ALL");
  const { userDetails, userMembership } = useAuth();

  let filters: MembershipStatus[] = ["ACTIVE", "INACTIVE"] as MembershipStatus[]
  if (userMembership?.permissions.includes(UserPermission.OWNER)
    || userMembership?.permissions.includes(UserPermission.ADD_COLLABORATOR)) {
    filters = ["ACTIVE", "INACTIVE", "PENDING"] as MembershipStatus[]
  }

  useEffect(() => {
    if (!hasPermission(userMembership!, UserPermission.VIEW_COLLABORATORS))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

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

  const data = setCollaboratorsCurrentUserFirst(
    collaboratorsList,
    userDetails?.id!, filters[2]
    ? undefined
    : MembershipStatus.PENDING
  )

  const renderItem = useCallback((
    { item, index }: { item: MembershipResponse, index: number }
  ) => (
    <CollaboratorListItem
      onPress={() => {
        queryClient.setQueryData([GET_COLLABORATOR, item.id], item);
        router.push(`${Routes.COLLABORATORS}/${item.id}`)
      }}
      key={index}
      name={item.user.name}
      membershipStatus={item.membershipStatus}
      isYou={item.user.id === userDetails?.id}
      userRole={item.permissions.includes(UserPermission.OWNER) ? "owner" : "collaborator"}
    />
  ), [])

  const emptyList = collaboratorsListFetching
    ? <CollaboratorsListLoadingSkeleton />
    : <EmptyCollaboratorList filter={currentFilter} />

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
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={emptyList}
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