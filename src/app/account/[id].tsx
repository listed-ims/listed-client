import { UserDetails } from "@listed-components/molecules";
import { useGetUserDetails } from "@listed-hooks";
import { Box } from "native-base"
import { ScreenContainer } from "react-native-screens"


const AccountDetails = () => {
    
  const {
    data: userDetails,
    isError: userError,
    isFetching: userFetching,
    isSuccess: userSuccess,
  } = useGetUserDetails();

    return (
        <ScreenContainer>
        <Box>
            <UserDetails userDetails={userDetails!}/>

        </Box>

        </ScreenContainer>
    )
}