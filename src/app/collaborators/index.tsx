import { AddIcon, Button } from "@listed-components/atoms"
import { CollaboratorListItem, CollaboratorsFilter } from "@listed-components/molecules"
import { ScreenContainer } from "@listed-components/organisms"
import { stackHeaderStyles } from "@listed-styles"
import { MembershipStatus } from "@listed-types"
import { Stack } from "expo-router"
import { Column, FlatList, useTheme } from "native-base"
import { useState } from "react"


const Collaborators = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "pending">("all");

  const mockData = [
    {
      name: "Johnny Johnny",
      userRole: "owner",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: true
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.PENDING,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.PENDING,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.INACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.ACTIVE,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.PENDING,
      isYou: false
    },
    {
      name: "Johnny Johnny",
      membershipStatus: MembershipStatus.INACTIVE,
      isYou: false
    },
  ]


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Collaborators")} />
      <Column height="full" space="4"
        paddingTop="4"
        paddingBottom="6"
      >
        <CollaboratorsFilter
          filter={filter}
          handleSetFilter={(filter) => { setFilter(filter) }} />
        <FlatList
          data={mockData}
          renderItem={({ item }) => (
            <CollaboratorListItem
              name={item.name}
              membershipStatus={item.membershipStatus}
              isYou={item.isYou}
              userRole={item.userRole || undefined}
            />
          )}
        />
        <Button
          alignSelf="flex-end"
          size="sm"
          px="4"
          startIcon={<AddIcon color={colors.white} />}
          borderRadius="full"
        >
          Add Collaborator
        </Button>
      </Column>
    </ScreenContainer>
  )
}

export default Collaborators